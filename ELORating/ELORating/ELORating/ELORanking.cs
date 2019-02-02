using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ELORating
{
    public class ELORanking
    {
        public enum MatchResult
        {
            Win,
            Lose
        }

        private List<MatchPlayer> matchup;
        private int numPlayers;

        public const int averageRanking = 1850;

        public List<MatchPlayer> Matchup
        {
            get
            {
                return this.matchup;
            }
            set
            {
                matchup = value;
            }
        }

        public int NumPlayers
        {
            get
            {
                return this.numPlayers;
            }
            set
            {
                numPlayers = value;
            }
        }

        public ELORanking(int numPlayers)
        {
            this.matchup = new List<MatchPlayer>(numPlayers);
            this.numPlayers = numPlayers;
        }


        protected static float GetExpectedScore(MatchPlayer player, MatchPlayer opponent)

        {
            ///  Ea = 1 / (1 + 10 ^ ((Ra - Rb) / 400 ))
            ///  Ra = player A rating
            ///  Rb = player B rating
            float ratingDiff =  (float)opponent.Rating - (float)player.Rating;
            float exponent = ratingDiff / 400f;
            float Ea = 1f / (1f + (float)Math.Pow(10f, exponent));

            return Ea;
        }


        public static float GetActualScore(MatchResult result)
        {
            switch (result)
            {
                case MatchResult.Win:
                    return 1f;
             
                case MatchResult.Lose:
                    return 0f;

                default:
                    return 0f;
            }
        }
  
        public double CalculateNewRatingForPlayer(MatchPlayer player)
        {
            /// R' = R + K ( Sa - Ea1 ) + K ( Sa - Ea2 ) ... K ( Sa - EaN )
            /// SA = actual score
            /// EA = expected score (from formula)

            float sumOfSubMatches = 0f;
            List<float> subMatchTerms = new List<float>();

            foreach (MatchPlayer opponent in matchup)
            {
                if (player == opponent) continue;

                float Ea = GetExpectedScore(player, opponent);
                float Sa = GetActualScore(player.Result);
                float K = player.KValue();
                float subMatch = K * (Sa - Ea);
                sumOfSubMatches += subMatch;
                subMatchTerms.Add(subMatch);
            }

            float sumOfTerms = subMatchTerms.Sum();
            player.NewRating = Math.Round(player.Rating + sumOfTerms);

            return player.NewRating;
          
        }
    }
}
