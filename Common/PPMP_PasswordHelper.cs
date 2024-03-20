using System;
using System.Text;

namespace PPMPS.Common
{
    public  class PPMP_PasswordHelper
    {
        public string EncodePasswordToBase64(string password)
        {
            byte[] data = new byte[password.Length];
            data = Encoding.UTF8.GetBytes(password);
            string encodedData = Convert.ToBase64String(data);

            return encodedData;
        }

        public string DecodeFrom64(string encodedData)
        {
            string result = "";
            try
            {
                UTF8Encoding encoder = new UTF8Encoding();
                Decoder utf8Decode = encoder.GetDecoder();
                byte[] todecode_byte = Convert.FromBase64String(encodedData);
                int charCount = utf8Decode.GetCharCount(todecode_byte, 0, todecode_byte.Length);
                char[] decoded_char = new char[charCount];
                utf8Decode.GetChars(todecode_byte, 0, todecode_byte.Length, decoded_char, 0);
                result = new String(decoded_char);

               
            }
            catch (Exception)
            {

                //do nothing
            }
            return result;
        }
    }
}