using System;
using System.Collections;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;

namespace ELORating
{
  public class ELOClient
    {
        
        public string readSeedData(string summonerName)
        {
            string tier = "";
            string json;
            int participantId = 0;

            using (WebClient wc = new WebClient())
            {
                json = wc.DownloadString("https://s3-us-west-1.amazonaws.com/riot-developer-portal/seed-data/matches10.json");
   
            }

            //  JsonToken content = new JsonToken();
            JToken content = JToken.Parse(json);
            string output = content["matches"].ToString();
            dynamic dynJson = JsonConvert.DeserializeObject(output);
            bool foundId = false;
            bool foundTier = false;

            foreach (var match in dynJson)
            {
                string matches = match["participantIdentities"].ToString();
                dynamic dynMatches = JsonConvert.DeserializeObject(matches);

                foreach (var participant in dynMatches)
                {

                    if( participant["player"]["summonerName"].ToString() == summonerName)
                    {
                        participantId = (int)participant["participantId"];
                        foundId = true;
                        break;
                       
                    }
                }

                if(foundId == true)
                {
                    break;
                }

            }

            foreach (var match in dynJson)
            {
                string matches = match["participants"].ToString();
                dynamic dynMatches = JsonConvert.DeserializeObject(matches);

                foreach (var participant in dynMatches)
                {
                    if ((int)participant["participantId"] == participantId)
                    {
                        tier = participant["highestAchievedSeasonTier"].ToString();
                        foundTier = true;
                        break;
                    }
                }

                if (foundTier == true)
                {
                    break;
                }             
            }
            

                return tier;
        }

        
        public double calculateProvisionalElo(string summoner, double ranking, DataPlayer dataGame)
        {
            double newRanking = 0;
            string tier = readSeedData(summoner);
            
            newRanking = dataGame.getRatingBasedOnHighestTierAchieved(tier);

            return newRanking;
        }


        public double calculateElo(string summonerName, double ranking, string matchOutcome, Hashtable opponents, Hashtable teamMates)
        {
            double newRanking = 0;
            double rankingPlayer = 0;

            ELORanking game = new ELORanking(10);

            MatchPlayer summoner = new MatchPlayer(summonerName, ranking);

            ICollection opponentsKeys = opponents.Keys;

            foreach (string player in opponentsKeys)
            {
                rankingPlayer = Convert.ToDouble(opponents[player]);
                MatchPlayer opponent = new MatchPlayer(player,rankingPlayer);
                
               if(matchOutcome.ToLower() == "win")
                {
                    opponent.Result = ELORanking.MatchResult.Lose;
                }
               else
                {
                    opponent.Result = ELORanking.MatchResult.Win;
                }

                game.Matchup.Add(opponent);
            }

            ICollection teamMatesKeys = teamMates.Keys;


            foreach (string player in teamMatesKeys)
            {
                rankingPlayer = Convert.ToDouble(teamMates[player]) ;
                MatchPlayer teamMate = new MatchPlayer(player, rankingPlayer);

                if (matchOutcome.ToLower() == "win")
                {
                  teamMate.Result = ELORanking.MatchResult.Win;
                }
                else
                {
                    teamMate.Result = ELORanking.MatchResult.Lose;
                }

                game.Matchup.Add(teamMate);
            }


            newRanking = game.CalculateNewRatingForPlayer(summoner);
            summoner.Rating = newRanking;

            return newRanking;
        }
    }
}
