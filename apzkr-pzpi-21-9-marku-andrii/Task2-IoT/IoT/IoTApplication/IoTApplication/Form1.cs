using IoTApplication.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace IoTApplication
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private async void button1_Click(object sender, EventArgs e)
        {
            var roomId = (int)numericUpDown1.Value;

            using (var client = new HttpClient())
            {
                string url = "https://localhost:5001/api/Rooms/" + roomId;
                var request = new HttpRequestMessage(HttpMethod.Get, url);

                try
                {
                    var response = await client.SendAsync(request);
                    response.EnsureSuccessStatusCode();

                    var responseContent = await response.Content.ReadAsStringAsync();
                    var room = JsonSerializer.Deserialize<Room>(responseContent, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
                    var dateTimeNow = DateTime.Now;
                    var currentSchedule = room.Schedules.FirstOrDefault(schedule => dateTimeNow >= schedule.StartTime && dateTimeNow <= schedule.EndTime);

                    if (currentSchedule != null)
                    {
                        ChangeLabelStatus(false, currentSchedule.Course.Name);
                    }
                    else
                    {
                        ChangeLabelStatus(true, null);
                    }
                }
                catch (Exception ex)
                {
                    MessageBox.Show("Error. Message: " + ex.Message);
                }
            }
        }

        private void ChangeLabelStatus(bool active, string courseName)
        {
            if (active)
            {
                label2.BackColor = Color.Green;
                label2.Text = "Not occupied";
            }
            else
            {
                label2.BackColor = Color.Red;
                label2.Text = $"Occupied. Course name: {courseName}";
            }
        }

        private void label2_Click(object sender, EventArgs e)
        {
            
        }
    }
}
