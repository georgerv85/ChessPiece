import { useState } from "react";
import "./App.css";

const SIZE = 8;

// Αντιστοίχιση κωδικών κομματιών σε Unicode icons
const PIECE_ICONS = {
  // ΛΕΥΚΑ
  wR: "♖",
  wB: "♗",

  // ΜΑΥΡΑ
  bR: "♜",
  bB: "♝",
};

// Φτιάχνει έναν κενό πίνακα 8x8
function createEmptyBoard() {
  return Array.from({ length: SIZE }, () => Array(SIZE).fill(null));
}

// Αρχικοποίηση σαν την ChessBoard.theseis() στη Java
function initialBoard() {
  const b = createEmptyBoard();

  // Άσπροι πύργοι και αξιωματικοί
  b[0][0] = "wR"; // white Rook
  b[0][7] = "wR";
  b[0][2] = "wB"; // white Bishop
  b[0][5] = "wB";

  // Μαύροι πύργοι και αξιωματικοί
  b[7][0] = "bR"; // black Rook
  b[7][7] = "bR";
  b[7][2] = "bB"; // black Bishop
  b[7][5] = "bB";

  return b;
}

function App() {
  // state της σκακιέρας
  const [board] = useState(initialBoard());

  // state για το επιλεγμένο τετράγωνο / κομμάτι
  const [selectedCell, setSelectedCell] = useState(null);

  // state για τα valid moves του επιλεγμένου κομματιού
  const [validMoves, setValidMoves] = useState([]);

  // Τι γίνεται όταν κάνω κλικ σε ένα τετράγωνο (row, col)
  function handleSquareClick(row, col) {
    const pieceCode = board[row][col];

    // Αν ξαναπατήσεις το ήδη επιλεγμένο τετράγωνο -> καθάρισε επιλογή
    if (
      selectedCell &&
      selectedCell.row === row &&
      selectedCell.col === col
    ) {
      setSelectedCell(null);
      setValidMoves([]);
      return;
    }

    // Αν πατάς σε άδειο τετράγωνο -> καθάρισε επιλογή/validMoves
    if (pieceCode == null) {
      setSelectedCell(null);
      setValidMoves([]);
      return;
    }

    // Αν πατάς σε τετράγωνο με κομμάτι -> επέλεξε το κομμάτι & υπολόγισε valid moves
    const moves = getValidMoves(board, row, col, pieceCode);

    setSelectedCell({
      row,
      col,
      pieceCode,
    });

    setValidMoves(moves);
  }

  return (
    <div className="app">
      <h1>ChessPiece – Rook &amp; Bishop Demo</h1>

      <div className="board">
        {board.map((row, r) =>
          row.map((cell, c) => {
            const pieceCode = cell; // <- ΤΩΡΑ ορίζουμε το pieceCode
            const isDark = (r + c) % 2 === 1;

            // αν υπάρχει κωδικός κομματιού, πάρε το αντίστοιχο icon
            const icon = pieceCode ? PIECE_ICONS[pieceCode] ?? "" : "";

            const isSelected =
              selectedCell &&
              selectedCell.row === r &&
              selectedCell.col === c;

            const isValidMove = validMoves.some(
              (m) => m.row === r && m.col === c
            );

            return (
              <div
                key={`${r}-${c}`}
                className={`square ${isDark ? "dark" : "light"} ${
                  isSelected ? "selected" : ""
                } ${isValidMove ? "valid-move" : ""}`}
                onClick={() => handleSquareClick(r, c)}
              >
                {pieceCode && (
                  <span
                    className={`piece ${
                      pieceCode.startsWith("w")
                        ? "white-piece"
                        : "black-piece"
                    }`}
                  >
                    {icon}
                  </span>
                )}
              </div>
            );
          })
        )}
      </div>

      <div className="info">
        {selectedCell ? (
          <p>
            Selected piece:{" "}
            <strong>{PIECE_ICONS[selectedCell.pieceCode]}</strong>{" "}
            at (row {selectedCell.row}, col {selectedCell.col})
          </p>
        ) : (
          <p>No piece selected.</p>
        )}
      </div>
    </div>
  );
}

// Υπολογισμός valid moves για Rook & Bishop (χωρίς να πηδάει πάνω από κομμάτια)
function getValidMoves(board, row, col, pieceCode) {
  if (!pieceCode) return [];

  const color = pieceCode[0]; // 'w' ή 'b'
  const type = pieceCode[1]; // 'R' ή 'B'

  const moves = [];

  if (type === "R") {
    // Rook: πάνω, κάτω, δεξιά, αριστερά
    addMovesInDirection(board, row, col, 1, 0, color, moves); // κάτω
    addMovesInDirection(board, row, col, -1, 0, color, moves); // πάνω
    addMovesInDirection(board, row, col, 0, 1, color, moves); // δεξιά
    addMovesInDirection(board, row, col, 0, -1, color, moves); // αριστερά
  } else if (type === "B") {
    // Bishop: διαγώνιες
    addMovesInDirection(board, row, col, 1, 1, color, moves);
    addMovesInDirection(board, row, col, 1, -1, color, moves);
    addMovesInDirection(board, row, col, -1, 1, color, moves);
    addMovesInDirection(board, row, col, -1, -1, color, moves);
  }

  return moves;
}

// Βοηθητική για να "σκανάρουμε" μία κατεύθυνση μέχρι να βρούμε άκρη ή εμπόδιο
function addMovesInDirection(board, row, col, dRow, dCol, color, moves) {
  const size = board.length;
  let r = row + dRow;
  let c = col + dCol;

  while (r >= 0 && r < size && c >= 0 && c < size) {
    const target = board[r][c];

    if (target == null) {
      // άδειο τετράγωνο → μπορούμε να πάμε
      moves.push({ row: r, col: c });
    } else {
      // υπάρχει κομμάτι
      const targetColor = target[0];
      if (targetColor !== color) {
        // αντίπαλο κομμάτι → μπορούμε να το φάμε (αλλά σταματάμε εκεί)
        moves.push({ row: r, col: c });
      }
      // είτε δικό μας είτε αντίπαλο, σταματάει εδώ η κατεύθυνση
      break;
    }

    r += dRow;
    c += dCol;
  }
}

export default App;

