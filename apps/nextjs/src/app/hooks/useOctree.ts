import { useMemo } from "react";
import { Group, Object3DEventMap, Scene } from "three";
import { Octree } from "three/examples/jsm/math/Octree";

function useOctree(scene: Group<Object3DEventMap> | Scene) {
  //console.log('in useOctree')
  const octree = useMemo(() => {
    console.log("new Octree");
    return new Octree().fromGraphNode(scene);
  }, [scene]);

  return octree;
}

export default useOctree;
