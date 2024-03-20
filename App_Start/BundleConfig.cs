using System.Web.Optimization;

namespace PPMPS
{
    public class BundleConfig
    {
        // For more information on Bundling, visit https://go.microsoft.com/fwlink/?LinkID=303951
        public static void RegisterBundles(BundleCollection bundles)
        {
            Bundle styles = new Bundle("~/bundles/styles", new CssMinify());
            styles.Include("~/AdminLte/googleFonts.css",
                           "~/AdminLte/plugins/fontawesome-free/css/all.min.css",
                           "~/AdminLte/dist/css/adminlte.min.css",
                           "~/AdminLte/plugins/datatables-bs4/css/dataTables.bootstrap4.min.css",
                           "~/AdminLte/plugins/datatables-responsive/css/responsive.bootstrap4.min.css",
                           "~/AdminLte/plugins/datatables-buttons/css/buttons.bootstrap4.min.css",
                           "~/AdminLte/plugins/select2/css/select2.min.css",
                           "~/AdminLte/plugins/select2-bootstrap4-theme/select2-bootstrap4.min.css",
                           "~/Content/site.css",
                           "~/AdminLte/plugins/sweetalert2/sweetalert2.min.css",
                           "~/AdminLte/plugins/toastr/toastr.min.css",
                           "~/AdminLte/plugins/chart.js/Chart.min.css"

                );
            bundles.Add(styles);

            bundles.Add(new ScriptBundle("~/bundles/adminlte")
                    .Include("~/AdminLte/plugins/jquery/jquery.min.js",
                             "~/AdminLte/plugins/bootstrap/js/bootstrap.bundle.min.js",
                             "~/AdminLte/dist/js/adminlte.min.js",
                             "~/AdminLte/plugins/datatables/jquery.dataTables.min.js",
                             "~/AdminLte/plugins/datatables-bs4/js/dataTables.bootstrap4.min.js",
                             "~/AdminLte/plugins/datatables-responsive/js/dataTables.responsive.min.js",
                             "~/AdminLte/plugins/datatables-responsive/js/responsive.bootstrap4.min.js",
                             "~/AdminLte/plugins/datatables-buttons/js/dataTables.buttons.min.js",
                             "~/AdminLte/plugins/datatables-buttons/js/buttons.bootstrap4.min.js",
                             "~/AdminLte/plugins/jszip/jszip.min.js",
                             "~/AdminLte/plugins/pdfmake/pdfmake.min.js",
                             "~/AdminLte/plugins/pdfmake/vfs_fonts.js",
                             "~/AdminLte/plugins/datatables-buttons/js/buttons.html5.min.js",
                             "~/AdminLte/plugins/datatables-buttons/js/buttons.print.min.js",
                             "~/AdminLte/plugins/datatables-buttons/js/buttons.colVis.min.js",
                             "~/AdminLte/plugins/datatables-buttons/js/buttons.colVis.min.js",
                             "~/AdminLte/plugins/sweetalert2/sweetalert2.all.js",
                             "~/AdminLte/plugins/select2/js/select2.full.min.js",
                             "~/AdminLte/plugins/bootstrap4-duallistbox/jquery.bootstrap-duallistbox.min.js",
                             "~/AdminLte/plugins/toastr/toastr.min.js",
                             "~/AdminLte/plugins/chart.js/Chart.min.js",
                             "~/Scripts/sweetalertcustom.js",
                             "~/Scripts/notification.js"
                ));

            // Use the Development version of Modernizr to develop with and learn from. Then, when you’re
            // ready for production, use the build tool at https://modernizr.com to pick only the tests you need
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                            "~/Scripts/modernizr-*"));
#if !DEBUG
                BundleTable.EnableOptimizations = true;
#endif
        }
    }
}