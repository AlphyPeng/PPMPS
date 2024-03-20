namespace PPMPS.Models
{
    public class PPMP_MedicineModel: DocumentAudit
    {
        public string Id { get; set; }
        public string StockNo { get; set; }
        public string BatchNo { get; set; }
        public string Brand { get; set; }
        public string MedicineName { get; set; }
        public string Description { get; set; }
        public string Unit { get; set; }
        public int ThresHold { get; set; }
        public int Quantity { get; set; }
        public string ExpiryDate { get; set; }
        public string Remarks { get; set; }
    }
}