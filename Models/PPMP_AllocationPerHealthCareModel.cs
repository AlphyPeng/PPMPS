using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PPMPS.Models
{
    public class PPMP_AllocationPerHealthCareModel : DocumentAudit
    {
        public int Id { get; set; }
        public string PpmpCode { get; set; }
        public string ProgramTitle { get; set; }
        public string AccountTitle { get; set; }
        public string Status { get; set; }
        public string LineItem { get; set; }
        public string ItemName { get; set; }
        public string UnitOfIssue { get; set; }
        public int Qty { get; set; }
        public string Program { get; set; }
        public string HealthCenter { get; set; }
       
        public string UserName { get; set; }

    }
}