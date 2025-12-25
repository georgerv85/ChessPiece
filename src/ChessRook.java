public class ChessRook extends ChessPiece {

    private static final String TYPE = "ROOK";

    public ChessRook(char clr, int r, int c) {
        super(clr, r, c); // καλώ τον Constructor της ChessPiece
    }

    // Έλεγχος αν ένας προορισμός είναι νόμιμος για τον Πύργο - ROOK - πρέπει να
    // κινείται ευθεία στην ιδια γραμμή ή στήλη

    public boolean validDestination(int targetRow, int targetColumn) {

        if (targetRow == row || targetColumn == column) {
            System.out.println("Η κίνηση είναι έγκυρη."); // Μόνο για έλεγχο 
            return true;
        } else {
            System.out.println("Η κίνηση ΔΕΝ είναι έγκυρη."); // Μόνο για έλεγχο 
            return false;
            
        }
    }

    public String toString() {
        return "" + color + "ROOK";
        // WROOK or BROOK
    }

}
