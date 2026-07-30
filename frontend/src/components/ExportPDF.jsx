import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import API from "../api/axios";

function ExportPDF() {

    const exportPDF = async () => {

        try {

            const res = await API.get("/transactions");

            const transactions = res.data;

            const doc = new jsPDF();

            // Title
            doc.setFontSize(18);
            doc.text("FinWise AI - Financial Report", 14, 18);

            doc.setFontSize(11);
            doc.text(
                `Generated: ${new Date().toLocaleDateString()}`,
                14,
                26
            );

            autoTable(doc, {
                startY: 35,

                head: [[
                    "Title",
                    "Category",
                    "Type",
                    "Amount",
                    "Date"
                ]],

                body: transactions.map((item) => [

                    item.title,

                    item.category,

                    item.type,

                    `₹${item.amount}`,

                    new Date(item.date).toLocaleDateString()

                ])
            });

            doc.save("FinWise_Report.pdf");

        }

        catch (err) {

            console.log(err);

            alert("Unable to export PDF");

        }

    };

    return (

        <button
            className="export-btn"
            onClick={exportPDF}
        >
            📄 Export PDF
        </button>

    );

}

export default ExportPDF;