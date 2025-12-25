public class ChessPiece { // superClass

    protected char color; //'w' = white 'b' = black
    protected int row;    // γραμμή 0..7
    protected int column;  // στήλη 0..7

    public ChessPiece (char clr, int r, int c){  //constructor
        color = clr;
        row = r;
        column = c;
    }

    // getters

    public char getColor() { 
        return color;
    }

    public int getRow() {
        return row;
    }

    public int getColumn() {
        return column;
    }

    public String toString(){

        return "Piece(color=" + color + ", row=" + row + ", col=" + column + ")";
    }
}
