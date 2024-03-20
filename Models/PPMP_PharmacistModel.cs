namespace PPMPS.Models
{
    public class PPMP_PharmacistModel: DocumentAudit
    {
        public int Id { get; set; }
        public int DistrictId { get; set; } 
        public string DistrictName { get; set; }
        public int BarangayId { get; set; } 
        public string BarangayName { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string ContactNo { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
    }
}