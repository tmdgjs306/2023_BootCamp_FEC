// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import {
    Chart,
    Point,
    // eslint-disable-next-line no-unused-vars
    Annotation,
    Axis,
    Coordinate,
    registerShape,
    // eslint-disable-next-line no-unused-vars

} from 'bizcharts';

registerShape('point', 'pointer', {
    draw(cfg, container) {

        const group = container.addGroup();

        const center = this.parsePoint({ x: 0, y: 0 });
        const start = this.parsePoint({ x: 0, y: 0.5 });


        // eslint-disable-next-line no-unused-vars
        const angle1 = Math.atan((start.y - center.y) / (start.x - center.x));
        const angle = (Math.PI - 2 * (angle1)) * cfg.points[0].x;

        this.preAngle = angle;

        return group;
    },
});


const TemperatureCharBar = () => {
    const scale = {
        value: {
            min: 0,
            max: 1,
            tickInterval: 0.1
        }
    }
    // eslint-disable-next-line no-unused-vars
    const [data] = useState([{ value: 0.56 }]);
    const startAngle = Math.PI / 2
    const endAngle = startAngle + Math.PI * 2;
    return (
        <Chart
            height={400}
            data={data}
            scale={scale}
            autoFit
        >
            <Coordinate
                type="polar"
                radius={0.75}
                startAngle={startAngle}
                endAngle={endAngle}
            />
            <Axis
                name="value"
                line={null}
                visible={false}
                label={{
                    offset: -36,
                    style: {
                        fontSize: 18,
                        textAlign: 'center',
                        textBaseline: 'middle',
                    },
                }}

                grid={null}
            />
            <Point
                position="value*1"
                color="#1890FF"
                shape="pointer"
            />
            <Annotation.Arc
                start={[0, 1]}
                end={[1, 1]}
                style={{
                    stroke: '#CBCBCB',
                    lineWidth: 18,
                    lineDash: null,
                    lineCap: 'round',
                }}
            />
            <Annotation.Arc
                start={[0, 1]}
                end={[data[0].value, 1]}
                style={{
                    stroke: '#1890FF',
                    lineCap: 'round',
                    lineWidth: 18,
                    lineDash: null,
                }}
            />
            <Annotation.Text
                position={['50%', '50%']}
                content={`${Math.round(data[0].value * 100)}%`}
                style={{
                    fontSize: 24,
                    fill: '#262626',
                    textAlign: 'center',
                }}
            />
        </Chart>
    )
}

export default TemperatureCharBar;