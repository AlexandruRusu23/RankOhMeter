using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using RiotNet.Models;
using RiotNet;
using System.IO;
using RiotNet.Converters;

namespace ELORating
{
   public class GetRankRiotApi 
    {

        private static string apiKey;
        public GetRankRiotApi(string pathTokey)
        {
           try
             {
                 apiKey = File.ReadAllText(pathTokey).Trim();
             }
             catch (FileNotFoundException ex)
             {
                 Console.WriteLine("Please enter your API key in key.txt" + ex.Message);
                 throw ex;
             }
            
        }

        public void Reset()
        { 
            SetRiotClientSettings();
        }

        public string ApiKey
        {
            get { return apiKey; }
        }

        public static void SetRiotClientSettings()
        {
            RiotClient.DefaultPlatformId = PlatformId.NA1;
            RiotClient.DefaultSettings = () => new RiotClientSettings
            {
                ApiKey = apiKey,
                MaxRequestAttempts = 4,
                RetryOnConnectionFailure = true,
                RetryOnRateLimitExceeded = true,
                RetryOnTimeout = true
            };
        }
    }

}
