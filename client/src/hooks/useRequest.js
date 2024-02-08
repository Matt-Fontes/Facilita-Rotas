import { useCallback, useState } from 'react';

/**
 * @template T, A
 * @description Hook para tratar requests, com loading e error
 * @param {(args: A) => Promise<T>} action {IUseRequestAction<Input, Output> Controller action to perform request
 * @returns {[(args: A) => Promise<T>, boolean]}
 * @example
 * const [request, isLoading] = useRequest(
 *   controller.findData
 * );
 */
export default function useRequest(action) {
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);

    const request = useCallback((...args) => {
        setIsLoading(true);

        const response = new Promise((resolve, reject) => {
            action(...args)
                .then((data) => {
                    resolve(data);
                    setIsLoading(false);
                    setHasError(false);
                })
                .catch((err) => {
                    reject(err);
                    setIsLoading(false);
                    setHasError(true);
                });
        });

        return response;
    }, []);

    return [request, isLoading, hasError];
}
