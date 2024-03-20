namespace PPMPS.Models
{
    public class PPMP_SupplierModel : DocumentAudit
    {
        public int Id { get; set; }
        public string SupplierCode { get; set; }
        public string SupplierName { get; set; } 
        public string ContactNo { get; set; }
        public string Email { get; set; }
        public string ContactPerson { get; set; }
        public string SupplierAddress { get; set; }
    }
}