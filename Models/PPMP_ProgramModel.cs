namespace PPMPS.Models
{
    public class PPMP_ProgramModel: DocumentAudit
    {
        public int Id { get; set; }
        public string ProgramName { get; set; }
        public string Description { get; set; }
    }
}