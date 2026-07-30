import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import API from "../api/axios";

function ExportExcel() {

    const exportExcel = async () => {

        try {

            const res = await API.get("/transactions");

            const transactions = res.data;

            const excelData = transactions.map((item) => ({

                Title: item.title,

                Category: item.category,

                Type: item.type,

                Amount: item.amount,

                Date: new Date(item.date).toLocaleDateString(),

                Description: item.description || ""

            }));

            const worksheet = XLSX.utils.json_to_sheet(excelData);

            const workbook = XLSX.utils.book_new();

            XLSX.utils.book_append_sheet(
                workbook,
                worksheet,
                "Transactions"
            );

            const excelBuffer = XLSX.write(workbook, {
                bookType: "xlsx",
                type: "array"
            });

            const file = new Blob(
                [excelBuffer],
                {
                    type:
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                }
            );

            saveAs(file, "FinWise_Transactions.xlsx");

        }

        catch (err) {

            console.log(err);

            alert("Excel export failed");

        }

    };

    return (

        <button
            className="excel-btn"
            onClick={exportExcel}
        >
            📊 Export Excel
        </button>

    );

}

export default ExportExcel;