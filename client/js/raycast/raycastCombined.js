// 
////////////////---------Shadow casting
// 
// import { Room, Block, Segment, Point } from './types';
//import { drawScene } from './drawScene';
// import { loadMap } from './loadMap';
//import { calculateVisibility } from './visibility';

////////---------TYPES
 const Rectangle =
  (x, y, width, height) => ({
    x, 
    y, 
    width, 
    height
  });

 const Block = Rectangle
 const Room = Rectangle;

 const Point = 
  (x, y) => ({
    x,
    y
  });

 const EndPoint =
  (x, y, beginsSegment, segment, angle) => ({
    ...Point(x, y),
    beginsSegment,
    segment,
    angle
  });

 const Segment =
  (x1, y1, x2, y2) => {
    const p1 = EndPoint(x1, y1);
    const p2 = EndPoint(x2, y2);
    const segment = { p1, p2, d: 0 };

    p1.segment = segment;
    p2.segment = segment;

    return segment;
  };


////////---------DRAW SCENE
const drawRectangle =
  (ctx, color, {x, y, width, height}) => {
    ctx.save();
    ctx.strokeStyle = 'black';
    ctx.strokeRect(x, y, width, height);
    ctx.restore();
  };

const drawSegment = 
  (ctx, color, {p1, p2}) => {
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = 'black';
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  }

const drawVisibilityTriangles =
  (ctx, color, lightSource, visibilityOutput) => {
    ctx.save();
    ctx.strokeStyle = color;
    for(var i = 0; i < visibilityOutput.length; i += 1) {
      let [p1, p2] = visibilityOutput[i];
      ctx.beginPath();
      ctx.moveTo(lightSource.x, lightSource.y);
      ctx.lineTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.closePath()
      ctx.stroke();
    }
    ctx.restore();
  };

 const drawScene =
  (ctx, room, lightSource, blocks, walls, visibilityOutput, showAll) => {
    ctx.clearRect(-10000, -10000, 20000, 20000);
    drawRectangle(ctx, 'black', room);
    blocks.forEach(drawRectangle.bind(null, ctx, 'black'));
    walls.forEach(drawSegment.bind(null, ctx, 'black'));
    drawVisibilityTriangles(ctx, 'gray', lightSource, visibilityOutput);
  };


////////---------LOADMAP

const { atan2, PI: π } = Math;

const flatMap =
  (cb, array) =>
    array.reduce((flatArray, item) => flatArray.concat(cb(item)), []);

const getCorners = ({x, y, width, height}) => ({
  nw: [x, y],
  sw: [x, y + height],
  ne: [x + width, y],
  se: [x + width, y + height]
});

const segmentsFromCorners =
  ({ nw, sw, ne, se }) => ([
    Segment(...nw, ...ne),
    Segment(...nw, ...sw),
    Segment(...ne, ...se),
    Segment(...sw, ...se)
  ]);

const rectangleToSegments =
  (rectangle) => segmentsFromCorners(getCorners(rectangle)); 

const calculateEndPointAngles = (lightSource, segment) => {
  const { x, y } = lightSource;
  const dx = 0.5 * (segment.p1.x + segment.p2.x) - x;
  const dy = 0.5 * (segment.p1.y + segment.p2.y) - y;

  segment.d = (dx * dx) + (dy * dy);
  segment.p1.angle = atan2(segment.p1.y - y, segment.p1.x - x);
  segment.p2.angle = atan2(segment.p2.y - y, segment.p2.x - x);
};

const setSegmentBeginning = (segment) => {
  let dAngle = segment.p2.angle - segment.p1.angle;

  if (dAngle <= -π) dAngle += 2 * π;
  if (dAngle >   π) dAngle -= 2 * π;

  segment.p1.beginsSegment = dAngle > 0;
  segment.p2.beginsSegment = !segment.p1.beginsSegment;
};

const processSegments = (lightSource, segments) => {
  for (let i = 0; i < segments.length; i += 1) {
    let segment = segments[i];
    calculateEndPointAngles(lightSource, segment);
    setSegmentBeginning(segment);
  }

  return segments;
};

const getSegmentEndPoints =
  (segment) => [segment.p1, segment.p2];

 const loadMap = (room, blocks, walls, lightSource) => {
  const segments = processSegments(lightSource, [
    ...rectangleToSegments(room),
    ...flatMap(rectangleToSegments, blocks),
    ...walls
  ]);

  const endpoints = flatMap(getSegmentEndPoints, segments);

  return endpoints;
};

////////---------SegmentInFrontOF
const leftOf = (segment, point) => {
  const cross = (segment.p2.x - segment.p1.x) * (point.y - segment.p1.y)
              - (segment.p2.y - segment.p1.y) * (point.x - segment.p1.x);
  return cross < 0;
};

const interpolate = (pointA, pointB, f) => {
  return Point(
    pointA.x*(1-f) + pointB.x*f,
    pointA.y*(1-f) + pointB.y*f
  );
};

 const segmentInFrontOf = (segmentA, segmentB, relativePoint) => {
  const A1 = leftOf(segmentA, interpolate(segmentB.p1, segmentB.p2, 0.01));
  const A2 = leftOf(segmentA, interpolate(segmentB.p2, segmentB.p1, 0.01));
  const A3 = leftOf(segmentA, relativePoint);
  const B1 = leftOf(segmentB, interpolate(segmentA.p1, segmentA.p2, 0.01));
  const B2 = leftOf(segmentB, interpolate(segmentA.p2, segmentA.p1, 0.01));
  const B3 = leftOf(segmentB, relativePoint);

  if (B1 === B2 && B2 !== B3) return true;
  if (A1 === A2 && A2 === A3) return true;
  if (A1 === A2 && A2 !== A3) return false;
  if (B1 === B2 && B2 === B3) return false;

  return false;
};



////////---------EndPointCompare
 const endpointCompare = (pointA, pointB) => {
  if (pointA.angle > pointB.angle) return 1;
  if (pointA.angle < pointB.angle) return -1;
  if (!pointA.beginsSegment && pointB.beginsSegment) return 1;
  if (pointA.beginsSegment && !pointB.beginsSegment) return -1;
  return 0;
};


////////---------lineIntersection
 const lineIntersection = (point1, point2, point3, point4) => {
  const s = (
    (point4.x - point3.x) * (point1.y - point3.y) -
    (point4.y - point3.y) * (point1.x - point3.x)
  ) / (
    (point4.y - point3.y) * (point2.x - point1.x) -
    (point4.x - point3.x) * (point2.y - point1.y)
  );
  
  return Point(
    point1.x + s * (point2.x - point1.x),
    point1.y + s * (point2.y - point1.y)
  );
};



////////---------VISIBILITY
//import { Point } from './types';
//import { segmentInFrontOf } from './segmentInFrontOf';
//import { endpointCompare } from './endpointCompare';
//import { lineIntersection } from './lineIntersection';

const { cos, sin } = Math;

const getTrianglePoints = (origin, angle1, angle2, segment) => {
  const p1 = origin;
  const p2 = Point(origin.x + cos(angle1), origin.y + sin(angle1));
  const p3 = Point(0, 0);
  const p4 = Point(0, 0);

  if (segment) {
    p3.x = segment.p1.x;
    p3.y = segment.p1.y;
    p4.x = segment.p2.x;
    p4.y = segment.p2.y;
  } else {
    p3.x = origin.x + cos(angle1) * 200;
    p3.y = origin.y + sin(angle1) * 200;
    p4.x = origin.x + cos(angle2) * 200;
    p4.y = origin.y + sin(angle2) * 200;
  }

  const pBegin = lineIntersection(p3, p4, p1, p2);

  p2.x = origin.x + cos(angle2);
  p2.y = origin.y + sin(angle2);

  const pEnd = lineIntersection(p3, p4, p1, p2);

  return [pBegin, pEnd];
};

 const calculateVisibility = (origin, endpoints) => {
  let openSegments = [];
  let output = [];
  let beginAngle = 0;

  endpoints.sort(endpointCompare);

  for(let pass = 0; pass < 2; pass += 1) {
    for (let i = 0; i < endpoints.length; i += 1) {
      let endpoint = endpoints[i];
      let openSegment = openSegments[0];
      
      if (endpoint.beginsSegment) {
        let index = 0
        let segment = openSegments[index];
        while (segment && segmentInFrontOf(endpoint.segment, segment, origin)) {
          index += 1;
          segment = openSegments[index]
        }

        if (!segment) {
          openSegments.push(endpoint.segment);
        } else {
          openSegments.splice(index, 0, endpoint.segment);
        }
      } else {
        let index = openSegments.indexOf(endpoint.segment)
        if (index > -1) openSegments.splice(index, 1);
      }
      
      if (openSegment !== openSegments[0]) {
        if (pass === 1) {
          let trianglePoints = getTrianglePoints(origin, beginAngle, endpoint.angle, openSegment);
          output.push(trianglePoints);
        }
        beginAngle = endpoint.angle;
      }
    }
  }

  return output;
};




////////---------MAIN SHADOW
const spreadMap =
  (cb) => (array2d) =>
    array2d.map(array1d => cb(...array1d));

const makeSegments = spreadMap(Segment)
const makeBlocks = spreadMap(Block);

// Prepare canvas
const canvas = document.getElementById('scene');
const ctx = canvas.getContext('2d');
const xOffset = 0.5;
const yOffset = 0.5;
ctx.translate(xOffset, yOffset);

// Setup scene
const room = Room(0, 0, 700, 500);

const walls = makeSegments([
  [20, 20, 20, 120],
  [20, 20, 100, 20],
  [100, 20, 150, 100],
  [150, 100, 50, 100],
]);

const blocks = makeBlocks([
  [ 50, 150, 20, 20],
  [150, 150, 40, 80],
  [400, 400, 40, 40]
]);

const run = (lightSource) => {
  const endpoints = loadMap(room, blocks, walls, lightSource);  
  const visibility = calculateVisibility(lightSource, endpoints);

  requestAnimationFrame(() =>
    drawScene(ctx, room, lightSource, blocks, walls, visibility));
};


canvas.addEventListener('mousemove', ({pageX, pageY}) => {
  let lightSource = Point(pageX, pageY);
  run(lightSource)
});

let lightSource = Point(100, 100);
run(lightSource);
