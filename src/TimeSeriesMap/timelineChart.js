import * as d3 from "d3";

let locale = d3.timeFormatLocale({
    dateTime: "%a %b %e %X %Y",
    date: "%Y/%-m/%-d",
    time: "%H:%M:%S",
    periods: ["上午", "下午"],
    days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
    shortDays: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
    months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
    shortMonths: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
});
let formatMillisecond = locale.format(".%L"),
    formatSecond = locale.format(":%S"),
    formatMinute = locale.format("%I:%M"),
    formatHour = locale.format("%I %p"),
    formatDay = locale.format("%d"),
    // formatWeek = locale.format("%b %d"),
    formatMonth = locale.format("%B"),
    formatYear = locale.format("%Y");

let multiFormat = (date) => {
    return (d3.timeSecond(date) < date ? formatMillisecond
        : d3.timeMinute(date) < date ? formatSecond
            : d3.timeHour(date) < date ? formatMinute
                : d3.timeDay(date) < date ? formatHour
                    : d3.timeMonth(date) < date ? formatDay
                        : d3.timeYear(date) < date ? formatMonth
                            : formatYear)(date);
}
let groupWidth = 0;
let groupHeight = 45;
let margin = {
    top: 0,
    right: 0,
    bottom: 25,
    left: 0
};

let elementWidth = 0
let elementHeight = 0
class TimelineChart {
    constructor(element, clickPoint) {
        this.element = element
        this.clickPoint = clickPoint
        this.options = this.extendOptions();

        this.init()

    }
    extendOptions(ext = {}) {
        let defaultOptions = {
            intervalMinWidth: 8, // px
            tip: undefined,
            textTruncateThreshold: 30,
            enableLiveTimer: false,
            timerTickInterval: 1000,
            hideGroupLabels: false
        };
        Object.keys(ext).map(k => defaultOptions[k] = ext[k]);
        return defaultOptions;
    }
    withCustom = (defaultClass) => {
        return d => d.customClass ? [d.customClass, defaultClass].join(' ') : defaultClass
    }
    updateData(data) {
        this.svg.selectAll('.group-dot-item').data([]).exit().remove();

        if (this.dots || this.dots1) {
            this.dots.remove();
            this.dots1.remove();
        }

        this.groupDotItems = this.svg.selectAll('.group-dot-item')
            .data(data)
            .enter()
            .append('g')
            .attr('clip-path', 'url(#chart-content)')
            .attr('class', 'item')
            .attr('transform', (d, i) => `translate(0, ${groupHeight * i})`)
            .selectAll('.dot')
            .data(d => {
                return d.data.filter(_ => _.type === TimelineChart.TYPE.POINT);
            })
            .enter();
        let xOrt = this.x
        if (this.t) {
            xOrt = this.t
        }

        let defColor = "#606060"
        let selColor = "#f5222d"
        this.circle = this.groupDotItems
            .append('circle')
            .attr('class', this.withCustom('dot'))
            .style("fill", (d) => {
                if (d.isSelect) {
                    return selColor
                }
                return defColor
            })
            .attr('cx', d => xOrt(d.at))
            .attr('cy', groupHeight / 2 + 5)
            .attr('r', 7)
            .on('click', (d)=>this.clickPoint(d));

        this.text = this.groupDotItems
            .append("text")
            .attr('class', this.withCustom('dot'))
            .style("fill", (d) => {
                if (d.isSelect) {
                    return selColor
                }
                return defColor
            })
            .attr('x', d => xOrt(d.at))
            .attr('y', groupHeight / 2 - 3)
            .attr("text-anchor", "middle")
            .text((d) => {
                if (d.metaInfo) {
                    return d.metaInfo.name;
                }
                return
            })
            .on('click', (d)=>this.clickPoint(d));


        this.line = this.groupDotItems
            .append('line')
            .attr('class', this.withCustom('dot'))
            .style("stroke", (d) => {
                if (d.isSelect) {
                    return selColor
                }
                return defColor
            })
            .attr('x1', d => xOrt(d.at))
            .attr('x2', d => xOrt(d.at))
            .attr('y1', groupHeight / 2 + 10)
            .attr('y2', groupHeight)

        this.zoomed();

    }
    updateXAxis(data, minDt, maxDt) {
        let xOrt = this.x
        if (this.t) {
            xOrt = this.t
        }


        if (!minDt && !maxDt) {

            minDt = xOrt.invert(0)
            maxDt = xOrt.invert(elementWidth)
        }
        this.createAxis(minDt, maxDt)

        this.updateData(data)
    }

    zoomed = () => {
        if (!d3.event || !d3.event.transform) {
            return
        }
        this.t = d3.event.transform.rescaleX(this.x)
        this.svg.select('.x.axis').call(this.xAxis.scale(this.t));
        this.svg.selectAll('circle.dot').attr('cx', d => this.t(d.at));
        this.svg.selectAll('text.dot').attr('x', d => this.t(d.at));
        this.svg.selectAll('line.dot').attr('x1', d => this.t(d.at)).attr('x2', d => this.t(d.at));

    }
    createAxis(minDt, maxDt) {

        elementWidth = this.element.clientWidth;
        elementHeight = this.element.clientHeight;

        let width = elementWidth - margin.left - margin.right;
        let height = elementHeight - margin.top - margin.bottom;

        this.x = d3.scaleTime()
            .domain([minDt, maxDt])
            .range([groupWidth, width]);

        this.xAxis = d3.axisBottom(this.x).tickFormat(multiFormat)

        this.zoom = d3.zoom().on('zoom', this.zoomed);

        if (this.svg) {
            this.svg.remove();
        }
        if (this.g) {
            this.g.remove();
        }
        if (this.rect) {
            this.rect.remove();
        }
        if (this.axis) {
            this.axis.remove();
        }
        if (this.groupSection) {
            this.groupSection.remove();
        }

        this.svg = d3.select(this.element).append('svg')
            .attr('width', elementWidth)
            .attr('height', elementHeight);


        this.g = this.svg.append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
            .call(this.zoom);

        this.rect = this.g.append('rect')
            .attr('class', 'chart-bounds')
            .attr('x', groupWidth)
            .attr('y', 0)
            .attr('height', height)
            .attr('width', width - groupWidth)

        //刻度
        this.axis = this.g.append('g')
            .attr('class', 'x axis')
            .attr('transform', 'translate(0,' + height + ')')
            .call(this.xAxis);

        //横长轴
        this.groupSection = this.g
            .append('line')
            .attr('class', 'group-section')
            .attr('x1', 0)
            .attr('x2', width)
            .attr('y1', groupHeight - 1)
            .attr('y2', groupHeight)

    }
    init() {
        this.element.classList.add('timeline-chart');

        let minDt = new Date(2019, 0, 1)
        let maxDt = new Date();

        this.createAxis(minDt, maxDt)

        this.zoomed();

    }
}
TimelineChart.TYPE = {
    POINT: Symbol(),
    INTERVAL: Symbol()
};
export default TimelineChart;