package com.example.temp_spring.Data;

import org.springframework.data.annotation.Id;


public class TemperatureData {

    @Id
    public String _id;  //object_id

    public String plant_id;
    public double value;
    public String sensor_name;
    public String time_stamp;

    public TemperatureData() {}

    public TemperatureData(String _id, String plant_id, double value, String sensor_name, String time_stamp) {
        this._id = _id;
        this.plant_id = plant_id;
        this.value = value;
        this.sensor_name = sensor_name;
        this.time_stamp = time_stamp;
    }

    @Override
    public String toString() {
        return String.format(
                "TemperatureData[id=%s, plant_id='%s', value='%.2f', sensor_name='%s', time_stamp='%s']",
                _id, plant_id, value, sensor_name, time_stamp);
    }

}