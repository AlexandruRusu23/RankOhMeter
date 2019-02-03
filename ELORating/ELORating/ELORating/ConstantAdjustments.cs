using System;

namespace ELORating
{
    public class ConstantAdjustments
    {
        static string id;
        static string rank;

        enum Tiers { Bronze, Silver, Gold, Platinum, Diamond, Master};

       // Task<List<LeaguePosition>> leagues;


        int getTierNumber(string tier)
        {
            int tierNumber =  0;

            switch (tier.ToLower())
            {
                case "bronze":
                    tierNumber = (int)Tiers.Bronze;
                    break;
                case "silver":
                    tierNumber = (int)Tiers.Silver;
                    break;
                case "gold":
                    tierNumber = (int)Tiers.Gold;
                    break;
                case "platinum":
                    tierNumber = (int)Tiers.Platinum;
                    break;
                case "diamond":
                    tierNumber = (int)Tiers.Diamond;
                    break;
                case "master":
                    tierNumber = (int)Tiers.Master;
                    break;
            }

            return tierNumber;
        }
        public string AdjustMethod(string summonerName, string rankOutcome, double rating, string pathTokey)
        {
            int tier;
            int tierOutcome;
            string adjustments = "No adjustments have been done";
            try
            {
                SummonerRank summonerRank = new SummonerRank(pathTokey);
                summonerRank.GetSummonerInfo(summonerName).Wait();

                id = summonerRank.encryptedSummonerId;

                summonerRank.GetLeagueAsync(summonerRank.encryptedSummonerId).Wait();
               

                foreach(var league in summonerRank.league)
                {
                    if(league.QueueType == "RANKED_SOLO_5x5")
                    {
                        rank = league.Tier;
                    }
                }
                rank = "Silver";


              if (!(rank == "UNRANKED" && rankOutcome == rank))
                {
                    tier = getTierNumber(rank);
                   tierOutcome = getTierNumber(rankOutcome);

                    if (rank != rankOutcome)
                    {
                        if (tier < tierOutcome) { adjustments = DataPlayer.adjustConstantsLowerLimit(rating, rank); }
                        else { adjustments = DataPlayer.adjustConstantsLowerLimit(rating, rank); }
                    }
                }

                return adjustments;
            }



            catch(Exception ex)
            {
                string message = ex.InnerException.Message;
               return  message = ex.Message;
            }
        }

        
      

    }
}
