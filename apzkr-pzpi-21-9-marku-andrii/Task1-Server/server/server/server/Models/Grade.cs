using System;

namespace server.Models
{
    public class Grade
    {
        public int Id { get; set; }
        public Student Student { get; set; }
        public int StudentId { get; set; }
        public Course Course { get; set; }
        public int CourseId { get; set; }
        public int StudentGrade { get; set; }
        public DateTime Date { get; set; }
    }
}
