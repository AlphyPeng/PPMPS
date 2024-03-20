using Newtonsoft.Json;
using PPMPS.Common;
using PPMPS.Models;
using PPMPS.Services;
using System;
using System.Web.Services;

namespace PPMPS.Masterfile
{
    public partial class PPMP_Roles : BasePage
    {
        private static RoleService _roleService;
        protected void Page_Load(object sender, EventArgs e)
        {
            _roleService = new RoleService();
        }

        [WebMethod]
        public static string GetRoles()
        {
            var data = _roleService.GetRoles();
            return JsonConvert.SerializeObject(data);
        }

        [WebMethod]
        public static void AddOrEditRoles(PPMP_RoleModel roles)
        {
            _roleService.AddOrEdit(roles);
        }

        [WebMethod]
        public static void Delete(int Id)
        {
            _roleService.Delete(Id);
        }
    }
}