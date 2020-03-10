import { useCallback, useEffect, useContext } from 'react';
import DiagramContext from './DiagramContext';

/**
 * Returns a callback that will perform the onPortRegister function when the context is ready (canvas exists)
 * and there's at least one input or one output
 */
export const usePortRegistration = (inputs, outputs, onPortRegister) => {
  const context = useContext(DiagramContext);

  return useCallback((portId, portElement) => {
    const { canvas, ports } = context;

    if (canvas && (inputs || outputs)) {
      if (ports && !ports[portId]) {
        onPortRegister(portId, portElement);
      }
    }
  }, [context, inputs, outputs]);
};

/**
 * Takes a dom reference and an onNodeRegister callback and perform the callback when the node is mounted
 * and the canvas is ready
 */
export const useNodeRegistration = (ref, onNodeRegister, id) => {
  const { canvas, nodes } = useContext(DiagramContext);

  useEffect(() => {
    if (onNodeRegister && ref.current && canvas && nodes && !nodes[id]) {
      onNodeRegister(id, ref.current);
    }
  }, [ref.current, canvas, nodes, onNodeRegister]);
};
