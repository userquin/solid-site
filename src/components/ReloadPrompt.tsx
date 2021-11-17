import { Component, Show } from "solid-js";
import { useRegisterSW } from 'virtual:pwa-register/solid';

const ReloadPrompt: Component = () => {  
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      console.log('SW Registered: ' + r)
    },
    onRegisterError(error) {
      console.log('SW registration error', error)
    },
  })
  const close = () => {
    setOfflineReady(false)
    setNeedRefresh(false)
  }
  return (
    <Show when={offlineReady() || needRefresh()}>
      <div>
        <div class="fixed w-80 bottom-5 text-sm right-5 m-2 p-5 border bg-gray-100 border-gray-300 rounded-md">
          <div class="mb-2">
            <span>App ready to work offline</span>
            <Show
              fallback={<span>New content available, click on reload button to update.</span>}
              when={offlineReady()}
            >
              <span>App ready to work offline</span>
            </Show>
          </div>
          <Show when={needRefresh()}>
            <button class="border text-sm rounded-md text-white bg-solid-default p-2 px-4" onClick={() => updateServiceWorker(true)}>Reload</button>
          </Show>
          <button class="border text-sm rounded-md text-white bg-solid-default p-2 px-4" onClick={() => close()}>Close</button>
        </div>
      </div>
    </Show>
  )
}

export default ReloadPrompt
