using Newtonsoft.Json;
using PPMPS.Common;
using PPMPS.Models;
using PPMPS.Services;
using System;
using System.Web.Services;

namespace PPMPS.Masterfile
{
    public partial class PPMP_User : BasePage
    {
        private static RoleService _roleService;
        private static UserService _userService;
        protected void Page_Load(object sender, EventArgs e)
        {
            _roleService = new RoleService();
            _userService = new UserService();
        }

        [WebMethod]
        public static string GetRoles()
        {
            var data = _roleService.GetRoles();
            return JsonConvert.SerializeObject(data);
        }
        [WebMethod]
        public static string GetUserById(int Id)
        {
            var data = _userService.GetUserById(Id);
            return JsonConvert.SerializeObject(data);
        }
        [WebMethod]
        public static string GetUsers()
        {
            var data = _userService.GetUsers();
            return JsonConvert.SerializeObject(data);
        }

        [WebMethod]
        public static void AddOrEditRoles(PPMP_UserModel user)
        {
            _userService.AddOrEdit(user);
        }

        [WebMethod]
        public static void Delete(int Id)
        {
            _userService.Delete(Id);
        }

        [WebMethod]
        public static string LoadDropdownList(string action)
        {
            var data = _userService.GetDropdown(action);
            return JsonConvert.SerializeObject(data);
        }

    }
}