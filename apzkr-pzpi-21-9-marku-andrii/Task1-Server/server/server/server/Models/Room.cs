using System.Collections.Generic;

namespace server.Models
{
    public class Room
    {
        public int Id { get; set; }
        public string Number { get; set; }
        public string Building { get; set; }
        public int Capacity { get; set; }
        public string Type { get; set; }
        public List<Schedule> Schedules { get; set; }
    }
}
