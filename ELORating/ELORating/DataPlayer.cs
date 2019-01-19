using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ELORating
{
  static public class  DataPlayer

    {
       static Random random = new Random();



    static public string getHighestTierAchieved(string summonerName)
        {
            string tier = "";
            //calculate from seed data from AWS(JSON)

            return tier;
        }

     static public double getRatingBasedOnHighestTierAchieved( string tier)
        {
            double rating = 0;

            switch (tier.ToLower())
            {
                case "unranked":
                    rating = 100;
                    break;
                case "bronze":
                    rating = random.Next(101, 1149);
                    break;
                case "silver":
                    rating = random.Next(1150, 1499);
                    break;
                case "gold":
                    rating = random.Next(1500, 1849);
                    break;
                case "platinum":
                    rating = random.Next(1850, 2199);
                    break;
                case "diamond":
                    rating = random.Next(2200, 2499);
                    break;
                default:
                    rating = random.Next(2500, 2999);
                    break;
            }
            return rating;
        }



    }
}



        