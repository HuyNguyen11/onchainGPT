import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useAppDispatch = () => useDispatch<any>();
