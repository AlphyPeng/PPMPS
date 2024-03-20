namespace PPMPS.Models
{
    public class PPMP_LocationModel: DocumentAudit
    {
        public int? DistrictId { get; set; }
        public string DistrictName { get; set; }
        public string DistrictDescription { get; set; }
        public int BarangayId { get; set; }
        public string BarangayName { get; set; }    
        public string BarangayDescription { get; set; } 

    }
}