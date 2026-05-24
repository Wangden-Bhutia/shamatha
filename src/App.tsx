import React, { Component, ReactNode } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  useLocation,
} from "react-router-dom";

import backgroundImage from "./assets/background.jpeg";
import designTokens from "./theme/designTokens";
import { AttentionEngineProvider } from "./context/AttentionEngine";

// Import all page components
import Index from "./pages/Index";
import Shamatha from "./pages/Shamatha";
import Practice from "./pages/Practice";
import Path from "./pages/Path";
import Assessment from "./pages/Assessment";
import Stage from "./pages/Stage";
import Journey from "./pages/Journey";
import Reflections from "./pages/Reflections";
import Library from "./pages/Library";

function BottomNavigation() {
  const navItems = [
    { label: "Home", to: "/" },
    { label: "Practice", to: "/practice" },
    { label: "Guide", to: "/library" },
    { label: "Journey", to: "/journey" },
    { label: "Reflections", to: "/reflections" },
  ];

  return (
    <nav
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        padding:
          "10px 12px calc(10px + env(safe-area-inset-bottom))",
        minHeight: "64px",
        boxShadow: "0 -1px 0 rgba(255,255,255,0.04)",
        background: "rgba(5,8,20,0.98)",
        borderTop: "1px solid rgba(255,255,255,0.055)",
        zIndex: 9999,
      }}
    >
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          style={({ isActive }) => ({
            color: isActive ? "#BFA86A" : "rgba(243,239,227,0.45)",
            textDecoration: "none",

            fontSize: isActive ? "0.83rem" : "0.76rem",
            fontWeight: isActive ? 500 : 350,
            letterSpacing: isActive ? "0.06em" : "0.05em",

            padding: "6px 10px",
            borderRadius: "999px",

            background: isActive
              ? "rgba(191,168,106,0.12)"
              : "transparent",

            border: "1px solid transparent",

            transform: isActive
              ? "translateY(-1px) scale(1.03)"
              : "translateY(0) scale(1)",

            boxShadow: isActive
              ? "0 4px 14px rgba(191,168,106,0.12)"
              : "none",

            transition: "all 220ms ease",
          })}
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}

function AppContent() {
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = React.useState(false);

  React.useEffect(() => {
    setIsTransitioning(true);

    const timer = window.setTimeout(() => {
      setIsTransitioning(false);
    }, parseInt(designTokens.motion.normal));

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      {isTransitioning && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.35)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            zIndex: 2000,
            opacity: 1,
            transition: `${designTokens.motion.normal} ${designTokens.motion.easing}`,
          }}
        />
      )}

      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/shamatha" element={<Shamatha />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/journey" element={<Journey />} />
        <Route path="/reflections" element={<Reflections />} />
        <Route path="/library" element={<Library />} />
        <Route path="/guide" element={<Library />} />
        <Route path="/path" element={<Path />} />
        <Route path="/assessment" element={<Assessment />} />
        <Route path="/stage/:id" element={<Stage />} />
      </Routes>
    </>
  );
}

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
  lastErrorTimestamp: number | null;
};

const RECOVERY_STORAGE_KEY =
  "shamatha-last-recovery";

class ContemplativeErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = {
    hasError: false,
    lastErrorTimestamp: null,
  };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return {
      hasError: true,
      lastErrorTimestamp: Date.now(),
    };
  }

  componentDidCatch(error: Error) {
    console.error("Shamatha rendering failure:", error);
  }

  componentDidMount() {
    const recoveryTimestamp =
      sessionStorage.getItem(
        RECOVERY_STORAGE_KEY,
      );

    if (!recoveryTimestamp) {
      return;
    }

    window.setTimeout(() => {
      sessionStorage.removeItem(
        RECOVERY_STORAGE_KEY,
      );
    }, 1200);
  }

  handleReload = () => {
    sessionStorage.setItem(
      RECOVERY_STORAGE_KEY,
      String(Date.now()),
    );
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <>
        <style>
          {`
            @keyframes fadeContemplativeRecovery {
              from {
                opacity: 0;
                transform: translateY(12px);
              }

              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
          `}
        </style>
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "32px",
            background:
              "radial-gradient(circle at top, #1e2a2f 0%, #0f1417 72%)",
            color: "#f3efe3",
            textAlign: "center",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: "-10%",
              background:
                "radial-gradient(circle at center, rgba(255,255,255,0.045), transparent 72%)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              maxWidth: "440px",
              display: "flex",
              flexDirection: "column",
              gap: "18px",
              opacity: 0.92,
              animation:
                "fadeContemplativeRecovery 420ms ease",
            }}
          >
            <div
              style={{
                fontSize: "3rem",
                opacity: 0.82,
              }}
            >
              ☸
            </div>

            <h1
              style={{
                margin: 0,
                fontSize: "1.5rem",
                fontWeight: 500,
                letterSpacing: "0.04em",
              }}
            >
              A temporary interruption occurred
            </h1>

            <p
              style={{
                margin: 0,
                lineHeight: 1.7,
                color: "rgba(243,239,227,0.72)",
              }}
            >
              Your practice data remains safely stored locally.
              The contemplative environment can be restored
              without losing continuity.
            </p>

            <div
              style={{
                opacity: 0.42,
                fontSize: "0.72rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "rgba(243,239,227,0.58)",
              }}
            >
              Recovery Boundary Active
            </div>

            <button
              onClick={this.handleReload}
              style={{
                marginTop: "8px",
                padding: "14px 18px",
                borderRadius: "999px",
                border:
                  "1px solid rgba(255,255,255,0.12)",
                background: "rgba(255,255,255,0.06)",
                color: "#f3efe3",
                cursor: "pointer",
                fontSize: "0.95rem",
                letterSpacing: "0.04em",
                transition:
                  "all 260ms ease",
                outline: "none",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter:
                  "blur(8px)",
              }}
            >
              Restore Practice Space
            </button>
            {this.state.lastErrorTimestamp && (
              <div
                style={{
                  marginTop: "4px",
                  opacity: 0.34,
                  fontSize: "0.7rem",
                  color:
                    "rgba(243,239,227,0.52)",
                }}
              >
                Recovery prepared locally
              </div>
            )}
          </div>
        </div>
        </>
      );
    }

    return this.props.children;
  }
}

function App() {
  return (
    <ContemplativeErrorBoundary>
      <AttentionEngineProvider>
        <Router>
          <div
            style={{
              minHeight: "100dvh",
              width: "100%",
              backgroundImage: `
                linear-gradient(
                  to bottom,
                  rgba(3, 8, 20, 0.74),
                  rgba(2, 6, 18, 0.88)
                ),
                url(${backgroundImage})
              `,
              backgroundSize: "cover",
              backgroundPosition: "center top",
              backgroundRepeat: "no-repeat",
              overflowX: "hidden",
              backgroundColor: "#050814",
              position: "relative",
            }}
          >
            <AppContent />
          </div>
          <BottomNavigation />
        </Router>
      </AttentionEngineProvider>
    </ContemplativeErrorBoundary>
  );
}

export default App;
