import React from 'react'
import RootNode from '@/components/Node'
import Canvas from '@/components/Canvas'
import RootContainer from '@/components/RootContainer'
import LayerContainer from '@/components/LayerContainer'

export default function Mind() {
  return (
    <div>
      <Canvas>
        <RootContainer></RootContainer>
      </Canvas>
    </div>
  )
}
