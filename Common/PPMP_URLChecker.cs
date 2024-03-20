using System.Net.Http;

namespace PPMPS.Common
{
    public static class PPMP_URLChecker
    {
        public static string UrlReferrer(this HttpRequestMessage request)
        {
            return request.Headers.Referrer == null ? "unknown" : request.Headers.Referrer.AbsoluteUri;
        }
    }
}