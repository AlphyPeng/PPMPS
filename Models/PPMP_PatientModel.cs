namespace PPMPS.Models
{
    public class PPMP_PatientModel: DocumentAudit
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string MiddleName { get; set; }
        public string BirthDate { get; set; }
        public string ContactNo { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public int DistrictId { get; set; }
        public string DistrictName {  get; set; }     
        public int BrgyId { get; set; }
        public string BrgyName { get; set; }
    }
}