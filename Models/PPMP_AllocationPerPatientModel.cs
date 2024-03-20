namespace PPMPS.Models
{
    public class PPMP_AllocationPerPatientModel: DocumentAudit
    {   
        public int Id { get; set; }
        public string TransactionCode { get; set; }
        public int PatientId { get; set; }
        public string FullName { get; set; }
        public int DistrictId { get; set; }
        public string DistrictName { get; set; }
        public int BarangayId { get; set; }
        public string BarangayName { get; set; }
        public string ContactNo { get; set; }
        public string Address { get; set; }
        public string Remarks { get; set; }
        public string Status { get; set; }
        public int Qty { get; set; }
        public string PPMPCode { get; set; }
        public string ItemName { get; set; }
        public string UnitOfIssue { get; set; }
        public string FullAddress { get; set; }
        public string StockNo { get; set; }
        public string MedicineName { get; set; }
        public int ThresHold { get; set; }
        public int Onhand { get; set; }

        public string UserName { get; set; }
    }
}