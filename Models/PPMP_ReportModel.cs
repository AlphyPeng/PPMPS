using System;
using System.EnterpriseServices.Internal;

namespace PPMPS.Models
{
    public class PPMP_ReportModel: DocumentAudit
    {
        public int Id { get; set; }
        public string PPMPCode { get; set; }
        public string ProgramTitle { get; set; }
        public string AccountTitle { get; set; }
        public string Status { get; set; }
        public string LineItem { get; set; }
        public string ItemName { get; set; }
        public string UnitOfIssue { get; set; }
        public int Qty { get; set; }
        public string Program { get; set; }
        public string District { get ; set; }
        public string Barangay { get ; set; }
        public string HealthCenter { get; set; }
        public string Patient { get; set; }
        public DateTime ReceivedDate { get; set; }
        public string ReceivedBy { get; set; }
        public string Module { get; set; }
        public int Forecast { get; set; }
        public string ItemLowStocks { get; set; }
        public string Year { get; set; }
        public string TotalQty { get; set; }
        public string AvgPerDay { get; set; }
        public string DaysRecorded { get; set; }
    }
}