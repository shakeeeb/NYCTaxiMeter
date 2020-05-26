using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NYCTaxiMeter.Helpers
{
    public static class Constants
    {
        public static class NYCTaxiConstants
        {
            // might want to switch some of these over to config options at a certain point. as for now, they are constants.

            /// <summary>
            /// Unit Fare price.
            /// </summary>
            public const decimal UNIT_FARE = .35m;

            /// <summary>
            /// the multiplier 
            /// its unit price * miles / (1/5) -> meaning the multiplier is 5
            /// </summary>
            public const int BELOW_THRESHOLD_MULTIPLIER = 5;

            /// <summary>
            /// cost of entry.
            /// </summary>
            public const decimal ENTRY_COST = 3.00m;

            /// <summary>
            /// state tax surcharge.
            /// </summary>
            public const decimal STATE_TAX_SURCHARGE = .50m;

            /// <summary>
            /// the weekday peak hour surcharge
            /// </summary>
            public const decimal WEEKDAY_PEAK_HOUR_SURCHARGE = 1.00m;

            /// <summary>
            /// A list of weekdays.
            /// </summary>
            public static List<System.DayOfWeek> Weekdays = new List<System.DayOfWeek>() { DayOfWeek.Monday, DayOfWeek.Tuesday,  DayOfWeek.Wednesday, DayOfWeek.Thursday, DayOfWeek.Friday};
        }

    }
}
