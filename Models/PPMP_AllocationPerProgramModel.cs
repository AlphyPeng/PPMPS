namespace PPMPS.Models
{
    public class PPMP_AllocationPerProgramModel: DocumentAudit
    {
        public int Id { get; set; }
        public string PPMPCode { get; set; }
        public string ProgramTitle { get; set; }
        public string AccountTitle { get; set; }
        public string Department { get; set; }
        public decimal TotalUnitCost { get; set; }
        public decimal TotalAmount { get; set; }
        public int Total { get; set; }
        public string Status { get; set; }
        public string LineItem { get; set; }
        public string ItemName { get; set; }
        public string UnitOfIssue { get; set; }
        public int Qty { get; set; }
        public decimal UnitCost { get; set; }
        public decimal Amount { get; set; }
        public string ProgramId { get; set; }
    }
}