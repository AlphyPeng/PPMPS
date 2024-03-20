namespace PPMPS.Models
{
    public class PPMP_PermissionModel
    {
        public int Id { get; set; }
        public string ModuleCode { get; set; }
        public string ModuleName { get; set; }
        public string DisplayText { get; set; }
        public string Type { get; set; }
        public string Icon { get; set; }
        public string PageOrder { get; set; }
        public int UserId { get; set; }
        public string UserName { get; set; }
        public int TreeView { get; set; }
    }
}