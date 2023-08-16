import { Chart, Tooltip, Interval, Effects, Legend, Guide, Axis, } from "bizcharts";

const { Text } = Guide;

const data = [
    {
        type: "percent",
        value: 77,
    },
];
// give min and max for scale based on plant
const scale = {
    value: {
        min: 0,
        max: 100,
    },
};
const HumidityCharbar = () => {

    return (
        <Chart data={data} width={200} height={200} padding={0} scale={scale}>
            <Tooltip />
            <Axis visible={false} />
            <Interval
                position="type*value"
                color="l (270) 0:rgba(106, 181, 71) .5:rgba(120, 224, 220) 1:rgba(25, 130, 196)"
                shape="liquid-fill-gauge"
                style={{
                    lineWidth: 10,
                    fillOpacity: 0.75,
                }}
                size={160}
                customInfo={{}}
            />
            <Legend visible={false} />
            <Effects>
                {(chart) => {
                    chart.geometries[0].customInfo({
                        radius: 0.9,
                        outline: { border: 2, distance: 0 },
                        wave: { count: 3, length: 192 },
                    });
                }}
            </Effects>
            <Guide>
                {data.map((row) => (
                    <Text
                        key={row.type} // Use a unique key
                        content={`${row.value}%`}
                        top
                        position={{
                            type: row.type, // Use the appropriate key for positioning
                            value: 50,
                        }}

                        style={{
                            opacity: 0.75,
                            fill: '#262626',
                            fontSize: window.innerWidth / 60,
                            textAlign: "center",
                        }}
                    />
                ))}
            </Guide>
        </Chart>
    );
}
export default HumidityCharbar