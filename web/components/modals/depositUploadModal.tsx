"use client";

import dataApi from "@/api/dataApi";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadFile, UploadProps } from "antd";
import { Button, Upload, message } from "antd";
import { useState } from "react";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";

import ModalLayer from "./modalLayer";
import { parseExcelDate } from "@/utils/utils";

export interface ForexDataRow {
	[key: string]: string;
}

type RawRow = {
	Report?: string;
	__EMPTY?: string;
	__EMPTY_1?: string;
	__EMPTY_2?: string;
	__EMPTY_3?: string;
	__EMPTY_4?: string;
	__EMPTY_5?: string;
	__EMPTY_6?: string;
	__EMPTY_7?: string;
};

type Trade = {
	transaction_date: Date;
	type: string;
	method: string;
	account: string;
	amount: string;
	status: string;
}

interface ModalProps {
	modalOpen: boolean;
	onClose?: () => void;
	props: Record<string, never>;
}

const DepositUploadModal = ({ modalOpen, onClose, props }: ModalProps) => {
	const [fileList, setFileList] = useState<UploadFile[]>([]);
	const [loading, setLoading] = useState(false);

	const handleFileChange: UploadProps["onChange"] = (info) => {
		let newFileList = [...info.fileList];
		newFileList = newFileList.slice(-1); // Only keep the last file
		setFileList(newFileList);
	};

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

			const result: Trade[] = Object.values(records).map((record) => {
				return {
					transaction_date: parseExcelDate(record.Report),
					type: record.__EMPTY,
					method: record.__EMPTY_1,
					account: record.__EMPTY_2,
					amount: record.__EMPTY_3,
					status: record.__EMPTY_4
				}
			});

			console.log("result => ", result);


			const response = await dataApi.depositUpload(result);

			if (response.success) {
				toast.success(`Successfully uploaded ${response.inserted}, skipped ${response.skipped} rows`);
				setFileList([]);
				if (onClose) {
					onClose();
				}
			} else {
				toast.error("Upload failed");
			}
		} catch (error: any) {
			console.error("Upload error:", error);
			toast.error(error?.message || "Failed to process Excel file");
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
					Upload Deposit Data
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

export default DepositUploadModal;