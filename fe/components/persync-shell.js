"use client";

import { AuthWall } from "./auth-wall";
import { DeleteToast } from "./delete-toast";
import { usePersync } from "./persync-provider";
import { MobileSidebarDrawer } from "./layout/mobile-sidebar-drawer";
import { MobileWorkspaceHeader } from "./layout/mobile-workspace-header";
import { SidebarContent } from "./layout/sidebar-content";
import { TabletSidebarRail } from "./layout/tablet-sidebar-rail";

export function PersyncShell({ children }) {
  const {
    history,
    viewer,
    isSidebarOpen,
    authWall,
    isGoogleSubmitting,
    deleteToast,
    setIsSidebarOpen,
    setAuthWall,
    loginWithGoogle,
    logout,
    deleteSession,
    undoDeleteSession,
    closeDeleteToast,
  } = usePersync();

  const sidebarProps = {
    history,
    viewer,
    isGoogleSubmitting,
    onDeleteSession: deleteSession,
    onContinueWithGoogle: loginWithGoogle,
    onLogout: logout,
    onClose: () => setIsSidebarOpen(false),
  };

  return (
    <>
      <div className="site-shell min-h-screen bg-transparent">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(142,162,255,0.08),transparent_24%),radial-gradient(circle_at_18%_18%,rgba(198,208,255,0.04),transparent_18%)]" />

        <div className="relative flex min-h-screen">
          <aside className="sidebar-panel app-sidebar-scroll fixed inset-y-0 left-0 z-30 hidden h-screen w-[280px] overflow-y-auto border-r border-white/6 lg:block">
            <SidebarContent {...sidebarProps} />
          </aside>

          <TabletSidebarRail history={history} onOpenSidebar={() => setIsSidebarOpen(true)} />

          <MobileSidebarDrawer
            {...sidebarProps}
            open={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />

          <div className="flex min-w-0 w-full flex-1 flex-col md:pl-[92px] lg:pl-[280px]">
            <div className="w-full px-4 pb-16 pt-4 sm:px-6 lg:px-8 lg:py-7 xl:px-10 2xl:px-12">
              <div className="mx-auto w-full max-w-[1380px]">
                <MobileWorkspaceHeader onOpenSidebar={() => setIsSidebarOpen(true)} />
                <div className="mt-3 w-full lg:mt-0">
                  <div className="flex w-full flex-col gap-8 pb-16 lg:gap-10">{children}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AuthWall
        open={authWall.open}
        details={authWall.details}
        onClose={() => setAuthWall({ open: false, details: null })}
        onContinueWithGoogle={loginWithGoogle}
        isSubmitting={isGoogleSubmitting}
      />
      <DeleteToast
        toast={deleteToast}
        onUndo={undoDeleteSession}
        onClose={closeDeleteToast}
      />
    </>
  );
}
