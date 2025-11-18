"use client";

import { Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadFile, UploadProps } from "antd";
import { useState } from "react";
import * as XLSX from "xlsx";

import ModalLayer from "./modalLayer";
import dataApi from "@/api/dataApi";

export interface ForexDataRow {
	[key: string]: string | number | boolean | null;
}

type RawRow = {
	Report?: string;
	__EMPTY?: string;
	__EMPTY_1?: string | number | boolean | null;
	__EMPTY_2?: string;
	__EMPTY_3?: string;
	__EMPTY_4?: string;
	__EMPTY_5?: string;
	__EMPTY_6?: string;
	__EMPTY_7?: string;
}

type Trade = {
	symbol: string;
	position: string;
	type: "Buy" | "Sell";
	volume: number;
	open_price: number;
	close_price: number;
	profit: number;
	open_time: Date;
	close_time: Date;
}

interface ModalProps {
	modalOpen: boolean;
	onClose?: () => void;
	props: Record<string, never>;
}

const HistoryUploadModal = ({ modalOpen, onClose, props }: ModalProps) => {
	const [fileList, setFileList] = useState<UploadFile[]>([]);
	const [loading, setLoading] = useState(false);

	const handleFileChange: UploadProps["onChange"] = (info) => {
		let newFileList = [...info.fileList];
		newFileList = newFileList.slice(-1); // Only keep the last file
		setFileList(newFileList);
	}

	const parseExcelFile = (file: File): Promise<ForexDataRow[]> => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onload = (e) => {
				try {
					const data = e.target?.result as ArrayBuffer;
					const workbook = XLSX.read(data, { type: "array" });
					const firstSheetName = workbook.SheetNames[0];
					const worksheet = workbook.Sheets[firstSheetName];
					const rows = XLSX.utils.sheet_to_json<ForexDataRow>(worksheet, {
						defval: null,
						raw: false,
					});
					resolve(rows);
				} catch (error) {
					reject(error);
				}
			};
			reader.onerror = () => reject(new Error("Failed to read file"));
			reader.readAsArrayBuffer(file);
		});
	}

	const handleUpload = async () => {
		if (fileList.length === 0) {
			message.warning("Please select an Excel file");
			return;
		}

		const file = fileList[0].originFileObj;
		if (!file) {
			message.error("File not found");
			return;
		}

		// Validate file type
		const validTypes = [
			"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
			"application/vnd.ms-excel",
			"application/x-excel",
			"application/x-msexcel",
		];

		if (!validTypes.includes(file.type) && !file.name.endsWith(".xlsx") && !file.name.endsWith(".xls")) {
			message.error("Please upload a valid Excel file (.xlsx or .xls)");
			return;
		}

		try {
			setLoading(true);
			const rows = await parseExcelFile(file);

			if (rows.length === 0) {
				message.warning("The Excel file is empty or contains no data");
				setLoading(false);
				return;
			}

			const records = rows.slice(2);

			const grouped = records.reduce<Record<string, RawRow[]>>((acc, row) => {
				const positionKey = String(row.__EMPTY_1 ?? ""); // force key to string
				if (!acc[positionKey]) acc[positionKey] = [];
				acc[positionKey].push(row);
				return acc;
			}, {});

			const result: Trade[] = Object.values(grouped).map((group) => {
				const openRow = group.find(r =>
					/buy/i.test(String(r.__EMPTY_4 ?? "")) || /in/i.test(String(r.__EMPTY_4 ?? ""))
				);
				const closeRow = group.find(r =>
					/sell/i.test(String(r.__EMPTY_4 ?? "")) || /out/i.test(String(r.__EMPTY_4 ?? ""))
				);

				const usedOpen = openRow ?? group[0];
				const usedClose = closeRow ?? group[group.length - 1];

				return {
					symbol: (String(usedOpen?.Report ?? usedClose?.Report ?? "")).trim(),
					position: String(usedOpen?.__EMPTY_1 ?? usedClose?.__EMPTY_1 ?? ""),
					type: /buy/i.test(String(usedOpen.__EMPTY_4 ?? "")) ? "Buy" : "Sell",
					volume: Number(usedOpen.__EMPTY_5 ?? usedClose.__EMPTY_5 ?? 0),
					open_price: Number(usedOpen.__EMPTY_6 ?? 0),
					close_price: Number(usedClose.__EMPTY_6 ?? 0),
					profit: Number(usedClose.__EMPTY_7 ?? 0),
					open_time: new Date(usedOpen.__EMPTY_3 ?? ""),
					close_time: new Date(usedClose.__EMPTY_3 ?? ""),
				};
			});

			const response = await dataApi.historyUpload(result);

			// if (result.success) {
			// 	message.success(`Successfully uploaded ${result.count} rows`);
			// 	setFileList([]);
			// 	if (onClose) {
			// 		onClose();
			// 	}
			// } else {
			// 	message.error("Upload failed");
			// }
		} catch (error: any) {
			console.error("Upload error:", error);
			message.error(error?.message || "Failed to process Excel file");
		} finally {
			setLoading(false);
		}
	}

	const beforeUpload = (file: File) => {
		const isExcel =
			file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
			file.type === "application/vnd.ms-excel" ||
			file.name.endsWith(".xlsx") ||
			file.name.endsWith(".xls");

		if (!isExcel) {
			message.error("You can only upload Excel files (.xlsx or .xls)");
			return false;
		}

		return false; // Prevent auto upload
	}

	return (
		<ModalLayer
			modalOpen={modalOpen}
			onClose={onClose}
			props={{ width: 600 }}
		>
			<div className="flex flex-col gap-6 pt-4">
				<h2 className="font-semibold text-[18px] text-center">
					Upload History Data
				</h2>

				<div className="flex flex-col gap-4">
					<Upload
						fileList={fileList}
						onChange={handleFileChange}
						beforeUpload={beforeUpload}
						accept=".xlsx,.xls"
						maxCount={1}
					>
						<Button icon={<UploadOutlined />} className="w-full">
							Select Excel File
						</Button>
					</Upload>

					{fileList.length > 0 && (
						<div className="text-sm text-gray-600">
							Selected: {fileList[0].name}
						</div>
					)}
				</div>

				<div className="flex items-center justify-end gap-2">
					<Button onClick={onClose} disabled={loading}>
						Cancel
					</Button>
					<Button
						type="primary"
						onClick={handleUpload}
						loading={loading}
						disabled={fileList.length === 0}
					>
						Upload
					</Button>
				</div>
			</div>
		</ModalLayer>
	);
}

export default HistoryUploadModal;