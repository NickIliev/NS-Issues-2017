import { View } from "ui/core/view";
import { Property } from "ui/core/dependency-observable"
import { Bindable } from "ui/core/bindable";
import { ObservableArray }  from "data/observable-array";

/**
 * This class is a base class for all kind of gauges.
 */
export class RadGauge extends View {

    /**
     * Identifies the {@link scales} dependency property.
     */
    static scalesProperty: Property;

    /**
     * Identifies the {@link title} dependency property.
     */
    static titleProperty: Property;

    /**
     * Identifies the {@link titleStyle} dependency property.
     */
    static titleStyleProperty: Property;

    /**
     * Identifies the {@link subtitleStyle} dependency property.
     */
    static subtitleStyleProperty: Property;

    /**
     * Identifies the {@link subtitle} dependency property.
     */
    static subtitleProperty: Property;

    /**
     * Identifies the {@link fillColor} dependency property.
     */
    static fillColorProperty: Property;

    /**
     * Gets or sets the scales collection of the RadGauge.
     */
    scales: ObservableArray<GaugeScale>;

    /**
     * Gets or sets the title of the RadGauge.
     */
    title: string;

    /**
     * Gets or sets the title style of the RadGauge.
     */
    titleStyle: TitleStyle;

    /**
     * Gets or sets the subtitle of the RadGauge.
     */
    subtitle: string;

    /**
     * Gets or sets the subtitle style of RadGauge.
     */
    subtitleStyle: SubtitleStyle;

    /**
     * Gets or sets the fillColor of the RadGauge.
     */
    fillColor: string;

    ios: any;
    
    android: any;
}

/**
 * Represents a radial gauge view.
 */
export class RadRadialGauge extends RadGauge {
}

/**
 * A base class for all styles.
 */
export class GaugeStyleBase extends Bindable {
    /**
     * Identifies the {@link fillColor} dependency property.
     */
    static fillColorProperty: Property;

    /**
     * Identifies the {@link strokeColor} dependency property.
     */
    static strokeColorProperty: Property;

    /**
     * Identifies the {@link strokeWidth} dependency property.
     */
    static strokeWidthProperty: Property;

    /**
     * Gets or sets the fill color of the style.
     */
    fillColor: string;

    /**
     * Gets or sets the stroke color of the style.
     */
    strokeColor: string;

    /**
     * Gets or sets the stroke width of the style.
     */
    strokeWidth: number;
}

/**
 * Represents a style for the gauge title.
 */
export class TitleStyle extends GaugeStyleBase {
    /**
     * Identifies the {@link textSize} dependency property.
     */
    static textSizeProperty: Property;

    /**
     * Identifies the {@link textColor} dependency property.
     */
    static textColorProperty: Property;

    /**
     * Identifies the {@link horizontalOffset} dependency property.
     */
    static horizontalOffsetProperty: Property;

    /**
     * Identifies the {@link verticalOffset} dependency property.
     */
    static verticalOffsetProperty: Property;

    /**
     * Gets or sets the text size of the title.
     */
    textSize: number;

    /**
     * Gets or sets the text color of the title.
     */
    textColor: string;

    /**
     * Gets or sets the horizontal offset of the title.
     */
    horizontalOffset: number;

    /**
     * Gets or sets the vertical offset of the title.
     */
    verticalOffset: number;
}

/**
 * Represents a style for the gauge subtitle.
 */
export class SubtitleStyle extends TitleStyle {

}

/**
 * Represents the scale's style.
 */
export class ScaleStyle extends GaugeStyleBase {

    /**
     * Identifies the {@link lineColor} dependency property. 
     */
    static lineColorProperty: Property;

    /**
     * Identifies the {@link lineThickness} dependency property. 
     */
    static lineThicknessProperty: Property;

    /**
     * Identifies the {@link ticksVisible} dependency property. 
     */
    static ticksVisibleProperty: Property;

    /**
     * Identifies the {@link majorTicksCount} dependency property. 
     */
    static majorTicksCountProperty: Property;

    /**
     * Identifies the {@link minorTicksCount} dependency property. 
     */
    static minorTicksCountProperty: Property;

    /**
     * Identifies the {@link ticksOffset} dependency property. 
     */
    static ticksOffsetProperty: Property;

    /**
     * Identifies the {@link ticksLayoutMode} dependency property. 
     */
    static ticksLayoutModeProperty: Property;

    /**
     * Identifies the {@link majorTicksWidth} dependency property. 
     */
    static majorTicksWidthProperty: Property;

    /**
     * Identifies the {@link minorTicksWidth} dependency property. 
     */
    static minorTicksWidthProperty: Property;
    
    /**
     * Identifies the {@link majorTicksLength} dependency property. 
     */
    static majorTicksLengthProperty: Property;

    /**
     * Identifies the {@link minorTicksLength} dependency property. 
     */
    static minorTicksLengthProperty: Property;

    /**
     * Identifies the {@link majorTicksStrokeColor} dependency property. 
     */
    static majorTicksStrokeColorProperty: Property;

    /**
     * Identifies the {@link minorTicksStrokeColor} dependency property. 
     */
    static minorTicksStrokeColorProperty: Property;

    /**
     * Identifies the {@link majorTicksFillColor} dependency property. 
     */
    static majorTicksFillColorProperty: Property;

    /**
     * Identifies the {@link minorTicksFillColor} dependency property. 
     */
    static minorTicksFillColorProperty: Property;

    /**
     * Identifies the {@link majorTicksStrokeWidth} dependency property. 
     */
    static majorTicksStrokeWidthProperty: Property;

    /**
     * Identifies the {@link minorTicksStrokeWidth} dependency property. 
     */
    static minorTicksStrokeWidthProperty: Property;

    /**
     * Identifies the {@link labelsVisible} dependency property. 
     */
    static labelsVisibleProperty: Property;

    /**
     * Identifies the {@link labelsCount} dependency property. 
     */
    static labelsCountProperty: Property;

    /**
     * Identifies the {@link labelsLayoutMode} dependency property. 
     */
    static labelsLayoutModeProperty: Property;

    /**
     * Identifies the {@link labelsOffset} dependency property. 
     */
    static labelsOffsetProperty: Property;

    /**
     * Identifies the {@link labelsSize} dependency property. 
     */
    static labelsSizeProperty: Property;

    /**
     * Identifies the {@link labelsColor} dependency property. 
     */
    static labelsColorProperty: Property;

    /**
     * Gets or sets the line color of the scale.
     */
    lineColor: string;

    /**
     * Gets or sets the line thickness of the scale.
     */
    lineThickness: number;

    /**
     * Gets or sets the visibility mode of the scale's ticks.
     */
    ticksVisible: boolean;

    /**
     * Gets or sets the major ticks count.
     */
    majorTicksCount: number;

    /**
     * Gets or sets the minor ticks count.
     */
    minorTicksCount: number;

    /**
     * Gets or sets the tick's offset.
     */
    ticksOffset: number;

    /**
     * Gets or sets the tick's layout mode.
     */
    ticksLayoutMode: ScaleTicksLayoutMode;

    /**
     * Gets or sets the major ticks width.
     */
    majorTicksWidth: number;

    /**
     * Gets or sets the minor ticks width.
     */
    minorTicksWidth: number;

    /**
     * Gets or sets the major ticks length.
     */
    majorTicksLength: number;

    /**
     * Gets or sets the minor ticks length.
     */
    minorTicksLength: number;

    /**
     * Gets or sets the major ticks stroke color.
     */
    majorTicksStrokeColor: string;

    /**
     * Gets or sets the minor ticks stroke color.
     */
    minorTicksStrokeColor: string;

    /**
     * Gets or sets the major ticks fill color.
     */
    majorTicksFillColor: string;

    /**
     * Gets or sets the minor ticks fill color.
     */
    minorTicksFillColor: string;

    /**
     * Gets or sets the major ticks stroke width.
     */
    majorTicksStrokeWidth: number;

    /**
     * Gets or sets the minor ticks stroke width.
     */
    minorTicksStrokeWidth: number;

    /**
     * Gets or sets the visibility mode of the labels.
     */
    labelsVisible: boolean;

    /**
     * Gets or sets the count of the labels.
     */
    labelsCount: number;

    /**
     * Gets or sets the labels' layout mode.
     */
    labelsLayoutMode: ScaleLabelsLayoutMode;

    /**
     * Gets or sets the labels' offset.
     */
    labelsOffset: number;

    /**
     * Gets or sets the size of the labels.
     */
    labelsSize: number;

    /**
     * Gets or sets the color of the labels.
     */
    labelsColor: string;
}

/**
 * Represents the base class for the styles of the gauge indicators.
 */
export class IndicatorStyle extends GaugeStyleBase {
}

/**
 * Represents the styles of the needle indicator.
 */
export class NeedleStyle extends IndicatorStyle {

    /**
     * Identifies the {@link length} dependency property. 
     */
    static lengthProperty: Property;

    /**
     * Identifies the {@link bottomWidth} dependency property. 
     */
    static bottomWidthProperty: Property;

    /**
     * Identifies the {@link topWidth} dependency property. 
     */
    static topWidthProperty: Property;

    /**
     * Identifies the {@link circleRadius} dependency property. 
     */
    static circleRadiusProperty: Property;

    /**
     * Identifies the {@link circleInnerRadius} dependency property. 
     */
    static circleInnerRadiusProperty: Property;

    /**
     * Identifies the {@link offset} dependency property. 
     */
    static offsetProperty: Property;

    /**
     * Identifies the {@link circleFillColor} dependency property. 
     */
    static circleFillColorProperty: Property;

    /**
     * Identifies the {@link circleStrokeColor} dependency property. 
     */
    static circleStrokeColorProperty: Property;

    /**
     * Identifies the {@link circleStrokeWidth} dependency property. 
     */
    static circleStrokeWidthProperty: Property;

    /**
     * Gets or sets the length of the needle.
     */
    length: number;

    /**
     * Gets or sets bottom width of the needle.
     */
    bottomWidth: number;

    /**
     * Gets or sets the top width of the needle.
     */
    topWidth: number;

    /**
     * Gets or sets radius if the needle's circle.
     */
    circleRadius: number;

    /**
     * Gets or sets the inner radius of the circle.
     */
    circleInnerRadius: number;

    /**
     * Gets or sets the offset of the needle from the circle.
     */
    offset: number;

    /**
     * Gets or sets the circle's fill color.
     */
    circleFillColor: string;

    /**
     * Gets or sets the circle's stroke color.
     */
    circleStrokeColor: string;

    /**
     * Gets or sets the circle's stroke width.
     */
    circleStrokeWidth: number;
}

/**
 * Represents the styles for bar indicators.
 */
export class BarIndicatorStyle extends IndicatorStyle {

    /**
     * Identifies the {@link cap} dependency property. 
     */
    static capProperty: Property;

    /**
     * Identifies the {@link barWidth} dependency property. 
     */
    static barWidthProperty: Property;

    /**
     * Gets or sets the indicator's cap mode.
     */
    cap: BarIndicatorCapMode;
    
    /**
     * Gets or sets the indicator's width.
     */
    barWidth: number;
}

/**
 * Represents a base class for all scales.
 */
export class GaugeScale extends Bindable {
    
    /**
     * Identifies the {@link indicators} dependency property. 
     */
    static indicatorsProperty: Property;

    /**
     * Identifies the {@link minimum} dependency property. 
     */
    static minimumProperty: Property;

    /**
     * Identifies the {@link maximum} dependency property. 
     */
    static maximumProperty: Property;

    /**
     * Identifies the {@link style} dependency property. 
     */
    static styleProperty: Property;

    /**
     * Gets or sets the collection of indicators of the scale.
     */
    indicators: ObservableArray<GaugeIndicator>;

    /**
     * Gets or sets the minimum range of the scale.
     */
    minimum: number;

    /**
     * Gets or sets the maximum range of the scale.
     */
    maximum: number;

    /**
     * Gets or sets the style of the scale.
     */
    style: ScaleStyle;

    ios: any;

    android: any;
}

/**
 * Represents a radial scale.
 */
export class RadialScale extends GaugeScale {
    
    /**
     * Identifies the {@link startAngle} dependency property. 
     */
    static startAngleProperty: Property;

    /**
     * Identifies the {@link sweepAngle} dependency property. 
     */
    static sweepAngleProperty: Property;

    /**
     * Identifies the {@link radius} dependency property. 
     */
    static radiusProperty: Property;

    /**
     * Gets or sets the start angle of the scale.
     */
    startAngle: number;

    /**
     * Gets or sets the sweep angle of the scale.
     */
    sweepAngle: number;

    /**
     * Gets or sets the radius of the scale. The value should be normalized.
     * A value of 1 means that the radius will match the smaller dimension of the gauge.
     */
    radius: number;
}

/**
 * Enumeration that defines the layout mode of the labels.
 * Outer will draw the labels outside of the scale while Inner will draw them inside the scale.
 */
declare enum ScaleLabelsLayoutMode {
    Outer,
    Inner
}

/**
 * Enumeration that defines the layout mode of the ticks.
 * Outer will draw the ticks outside of the scale while Inner will draw them inside the scale.
 */
declare enum ScaleTicksLayoutMode {
    Outer,
    Inner
}

/**
 * Represents a base class for all indicators.
 */
export class GaugeIndicator extends Bindable {

    /**
     * Identifies the {@link isAnimated} dependency property. 
     */
    static isAnimatedProperty: Property;

    /**
     * Identifies the {@link animationDuration} dependency property. 
     */
    static animationDurationProperty: Property;

    /**
     * Determines if the indicator should be animated when its value is changed.
     */
    isAnimated: boolean;

    /**
     * Gets or sets the duration of the animation.
     */
    animationDuration: number;

    ios: any;

    android: any;
}

/**
 * Represents a radial needle indicator.
 */
export class RadialNeedle extends GaugeIndicator {

    /**
     * Identifies the {@link style} dependency property. 
     */
    static styleProperty: Property;

    /**
     * Identifies the {@link value} dependency property. 
     */
    static valueProperty: Property;

    /**
     * Gets or sets the style of the needle.
     */
    style: NeedleStyle;

    /**
     * Gets or sets the value of the needle.
     */
    value: number;
}

/**
 * Represents base class for bar indicators.
 */
export class BarIndicator extends GaugeIndicator {
    
    /**
     * Identifies the {@link style} dependency property. 
     */
    static styleProperty: Property;

    /**
     * Identifies the {@link minimum} dependency property. 
     */
    static minimumProperty: Property;

    /**
     * Identifies the {@link maximum} dependency property. 
     */
    static maximumProperty: Property;

    /**
     * Identifies the {@link location} dependency property. 
     */
    static locationProperty: Property;

    /**
     * Identifies the {@link animationStartValue} dependency property. 
     */
    static animationStartValueProperty: Property;

    /**
     * Gets or sets the style of the indicator.
     */
    style: BarIndicatorStyle;

    /**
     * Gets or sets the minimum value of the indicator.
     */
    minimum: number;

    /**
     * Gets or sets the maximum value of the indicator.
     */
    maximum: number;

    /**
     * Gets or sets the location of the indicator.
     */
    location: number;

    /**
     * Gets or sets the animation start value of the indicator.
     */
    animationStartValue: number;
}

/**
 * Represents a radial bar indicator.
 */
export class RadialBarIndicator extends BarIndicator {
}

/**
 * Enumeration that describes cap modes for the bar indicators.
 */
declare enum BarIndicatorCapMode {
    Round,
    Edge
}

