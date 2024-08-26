using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IoTApplication.Models
{
    public class Schedule
    {
        public int Id { get; set; }
        public Course Course { get; set; }
        public int CourseId { get; set; }
        public Room Room { get; set; }
        public int RoomId { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
    }
}
