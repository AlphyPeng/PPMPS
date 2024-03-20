namespace PPMPS.Models
{
    public class PPMP_RoleModel : DocumentAudit
    {
        public int Id { get; set; }
        public string RoleName { get; set; }
        public string Description { get; set; }
    }
}