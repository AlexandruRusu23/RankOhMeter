using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ELORating
{
    public class  DataPlayer

    {
       static Random random = new Random();
       public static double upperLimitBronze;
       public static double lowerLimitSilver, upperLimitSilver;
       public static double lowerLimitGold, upperLimitGold;
       public static double lowerLimitPlatinum, upperLimitPlatinum;
       public static double lowerLimitDiamond, upperLimitDiamond;
       public static double lowerLimitMaster, upperLimitMaster;

        public DataPlayer( double upperLimitBronzeDB, double lowerLimitSilverDB, double upperLimitSilverDB, double lowerLimitGoldDB, double upperLimitGoldDB, double lowerLimitPlatinumDB, 
            double upperLimitPlatinumDB, double lowerLimitDiamondDB, double upperLimitDiamondDB, double lowerLimitMasterDB, double upperLimitMasterDB)
        {
            upperLimitBronze = upperLimitBronzeDB;
            lowerLimitSilver = lowerLimitSilverDB;
            upperLimitSilver = upperLimitSilverDB;
            lowerLimitGold = lowerLimitGoldDB;
            upperLimitGold = upperLimitGoldDB;
            lowerLimitPlatinum = lowerLimitPlatinumDB;
            upperLimitPlatinum = upperLimitPlatinumDB;
            lowerLimitDiamond = lowerLimitDiamondDB;
            upperLimitDiamond = upperLimitDiamondDB;
            lowerLimitMaster = lowerLimitMasterDB;
            upperLimitMaster = upperLimitMasterDB;
    }


        static public string getHighestTierAchieved(string summonerName)
        {
            string tier = "";
            //calculate from seed data from AWS(JSON)

            return tier;
        }

        static public string adjustConstantsLowerLimit(double rating, string rank)
        {
            string adjustLower = "No adjustment has been done";
            switch (rank.ToLower())
            {
                case "unranked":
                    break;
                case "silver":
                    lowerLimitSilver = rating;
                    adjustLower = "lowerLimitSilver";
                    break;
                case "gold":
                    lowerLimitGold = rating;
                    adjustLower = "lowerLimitGold";
                    break;
                case "platinum":
                    lowerLimitPlatinum = rating;
                    adjustLower = "lowerLimitPlatinum";
                    break;
                case "diamond":
                    lowerLimitDiamond = rating;
                    adjustLower = "lowerLimitDiamond";
                    break;
                case "master":
                    lowerLimitMaster = rating;
                    adjustLower = "lowerLimitMaster";
                    break;
            }
            return adjustLower;
        }

        static public string adjustConstantsUpperLimit(double rating, string rank)
        {
            string adjustUpper = "No adjustment has been done";

            switch (rank.ToLower())
            {
                case "unranked":
                    break;
                case "silver":
                    upperLimitSilver = rating;
                    adjustUpper = "upperLimitSilver";
                    break;
                case "gold":
                    upperLimitGold = rating;
                    adjustUpper = "upperLimitGold";
                    break;
                case "platinum":
                    upperLimitPlatinum = rating;
                    adjustUpper = "upperLimitPLatinum";
                    break;
                case "diamond":
                    upperLimitDiamond = rating;
                    adjustUpper = "upperLimitDiamond";
                    break;
                case "master":
                    upperLimitMaster = rating;
                    adjustUpper = "upperLimitMaster";
                    break;
            }
            return adjustUpper;
        }

        public double getRatingBasedOnHighestTierAchieved( string tier)
        {
            double rating = 0;

            switch (tier.ToLower())
            {
                case "unranked":
                    rating = 100;
                    break;
                case "bronze":
                    rating = random.NextDouble() * (upperLimitBronze - 101) + 101;
                    break;
                case "silver":
                    //rating = random.Next(1150, 1499);
                    rating = random.NextDouble() * (upperLimitSilver - lowerLimitSilver) + lowerLimitSilver;
                    break;
                case "gold":
                    //rating = random.Next(1500, 1849);
                    rating = random.NextDouble() * (upperLimitGold - lowerLimitGold) + lowerLimitGold;
                    break;
                case "platinum":
                    //rating = random.Next(1850, 2199);
                    rating = random.NextDouble() * (upperLimitPlatinum - lowerLimitPlatinum) + lowerLimitPlatinum;
                    break;
                case "diamond":
                    //rating = random.Next(2200, 2499);
                    rating = random.NextDouble() * (upperLimitDiamond - lowerLimitDiamond) + lowerLimitDiamond;
                    break;
                case "master":
                    //rating = random.Next(2500, 2999);
                    rating = random.NextDouble() * (upperLimitMaster - lowerLimitMaster) + lowerLimitMaster;
                    break;
            }
            return rating;
        }



    }
}



        