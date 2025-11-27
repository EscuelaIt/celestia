'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

export function SpaceBackground() {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current) return

    const svg = d3.select(svgRef.current)
    const width = window.innerWidth
    const height = window.innerHeight

    svg.attr('width', width).attr('height', height)

    // Clear previous content
    svg.selectAll('*').remove()

    // Create stars
    const stars = Array.from({ length: 200 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.8 + 0.2,
      twinkleSpeed: Math.random() * 3000 + 2000,
    }))

    // Add stars
    svg
      .selectAll('.star')
      .data(stars)
      .enter()
      .append('circle')
      .attr('class', 'star')
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      .attr('r', d => d.radius)
      .attr('fill', '#ffffff')
      .attr('opacity', d => d.opacity)
      .each(function (d) {
        d3.select(this)
          .transition()
          .duration(d.twinkleSpeed)
          .ease(d3.easeLinear)
          .attr('opacity', 0.1)
          .transition()
          .duration(d.twinkleSpeed)
          .ease(d3.easeLinear)
          .attr('opacity', d.opacity)
          .on('end', function repeat() {
            d3.select(this)
              .transition()
              .duration(d.twinkleSpeed)
              .ease(d3.easeLinear)
              .attr('opacity', 0.1)
              .transition()
              .duration(d.twinkleSpeed)
              .ease(d3.easeLinear)
              .attr('opacity', d.opacity)
              .on('end', repeat)
          })
      })

    // Create nebula effect
    const nebula = svg
      .append('defs')
      .append('radialGradient')
      .attr('id', 'nebula')
      .attr('cx', '50%')
      .attr('cy', '50%')
      .attr('r', '50%')

    nebula.append('stop').attr('offset', '0%').attr('stop-color', '#4338ca').attr('stop-opacity', 0.1)

    nebula.append('stop').attr('offset', '50%').attr('stop-color', '#7c3aed').attr('stop-opacity', 0.05)

    nebula.append('stop').attr('offset', '100%').attr('stop-color', '#ec4899').attr('stop-opacity', 0.02)

    // Add nebula circles
    svg
      .append('circle')
      .attr('cx', width * 0.2)
      .attr('cy', height * 0.3)
      .attr('r', 150)
      .attr('fill', 'url(#nebula)')
      .attr('opacity', 0.6)

    svg
      .append('circle')
      .attr('cx', width * 0.8)
      .attr('cy', height * 0.7)
      .attr('r', 200)
      .attr('fill', 'url(#nebula)')
      .attr('opacity', 0.4)

    // Handle resize
    const handleResize = () => {
      const newWidth = window.innerWidth
      const newHeight = window.innerHeight
      svg.attr('width', newWidth).attr('height', newHeight)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <svg
      ref={svgRef}
      className="fixed inset-0 w-full h-full -z-10"
      style={{ background: 'radial-gradient(ellipse at center, #0f172a 0%, #020617 100%)' }}
    />
  )
}
