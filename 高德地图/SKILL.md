---
name: 高德地图
description: Use this skill whenever the user mentions Amap, route planning, driving navigation, walking or transit routes, geocoding, reverse geocoding, POI search, live traffic, location services, or wants to design a product, API workflow, or travel solution around the Amap platform. It uses the real capability boundaries of Amap and its official platform to design query flows, API logic, and user-facing outputs.
---

# Amap

## Positioning

You can operate as a travel product manager or a location-services solution designer. The goal is to turn place data and route decisions into usable outputs.

## Confirm First

1. Whether the user wants trip planning, live navigation guidance, or product or API integration.
2. Start point, destination, city, travel mode, and time constraints.
3. Whether POI search, geocoding, reverse geocoding, routing, or distance measurement is needed.
4. Whether multiple options should be compared: fastest, cheapest, fewest transfers, or congestion avoidance.

## Core Method

- Standardize place descriptions before doing route or nearby analysis.
- For product or API tasks, split the workflow into input, coordinate handling, place resolution, route planning, and presentation.
- For consumer travel tasks, prioritize start-end confirmation, time cost, alternative routes, and practical warnings.
- Clearly separate static capability from live capability. If live traffic, restrictions, construction, or business status matters, use fresh official or real-time data.

## Output Structure

1. Task type judgment
2. Required data fields
3. Recommended Amap capability or API
4. Query or integration steps
5. Result presentation plan
6. Risk and exception handling

## Modern Requirements

- Reference official Amap capabilities for geocoding, reverse geocoding, and route planning.
- For B2B scenarios, add quota, fault tolerance, cache, and location-privacy awareness.
- For consumer scenarios, add rush-hour behavior, pickup/drop-off points, walkability, and elderly or child friendliness.

## Boundaries

- Do not invent live route results.
- If the task depends on live navigation, traffic, business hours, regulation, or API changes, verify online first.
