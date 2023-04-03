import { useNavigation } from "@remix-run/react"
import { useCallback, useEffect, useState } from "react"
import debounce from "just-debounce-it"
import nProgress from "nprogress"
import { useSomeFetcherIsSubmitting } from "@sjc5/remix-hooks"

export const useLoadingEffect = () => {
  const { state: transition_state } = useNavigation()
  const some_fetcher_is_submitting = useSomeFetcherIsSubmitting()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounced_start = useCallback(
    debounce(
      () => {
        nProgress.start()
      },
      50,
      true
    ),
    []
  )

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounced_done = useCallback(
    debounce(
      () => {
        nProgress.done()
      },
      50,
      false
    ),
    []
  )

  const [global_is_loading, set_global_is_loading] = useState(false)

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | undefined

    if (
      (transition_state !== "idle" || some_fetcher_is_submitting) &&
      !global_is_loading
    ) {
      timeout = setTimeout(() => {
        if (
          (transition_state !== "idle" || some_fetcher_is_submitting) &&
          !global_is_loading
        ) {
          set_global_is_loading(true)
        }
      }, 10)
    } else {
      set_global_is_loading(false)
    }
    return () => {
      if (timeout) clearTimeout(timeout)
    }
  }, [
    transition_state,
    some_fetcher_is_submitting,
    debounced_start,
    debounced_done,
    global_is_loading,
  ])

  useEffect(() => {
    if (global_is_loading) {
      debounced_start()
    } else {
      debounced_done()
    }

    return () => {
      debounced_done()
    }
  }, [global_is_loading, debounced_start, debounced_done])
}
