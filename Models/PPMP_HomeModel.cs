namespace PPMPS.Models
{
    public class PPMP_HomeModel: DocumentAudit
    {
        public string Program { get; set; }

        public string District { get; set; }
        public string HealthCenter { get; set; }
        public string Patient { get; set; }

        public int Qty { get; set; }

        public int ProgramCount { get; set; }
        public int DistrictCount { get; set; }
        public int HealthCenterCount { get; set; }
        public int PatientCount { get; set;}
    }
    
}