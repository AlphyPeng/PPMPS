namespace PPMPS.Models
{
    public class PPMP_UserModel: DocumentAudit
    {
        public int Id { get; set; }
        public int RoleId { get; set; }
        public string RoleName { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Modules { get; set; }
        public int DistrictId { get; set; }
        public string DistrictName { get; set; }
        public int BarangayId { get; set; }
        public string BarangayName { get; set; }

    }
}